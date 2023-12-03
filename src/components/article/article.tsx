import format from 'date-fns/format';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useEffect, useRef, useState } from 'react';
// import rehypeRaw from 'rehype-raw';

import avatarDefaultImage from '../../assets/images/avatar.svg';
import { IArticleIs, TUserCurrent } from '../../types/types';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import { getValidImageSrc } from '../../services/get-valid-image-src/get-valid-image-src';
import { articleRequestDelete, articleRequestFavorite } from '../../services/realworld-blog-api/real-world-blog-api';
import { articleCurrentSet } from '../../redux/actions';
import { ArticleActionBlock } from '../article-action-block/article-action-block';

import classes from './article.module.scss';

interface IArticleProps extends IArticleIs {
  active?: boolean;
}

export const Article: React.FunctionComponent<IArticleProps> = ({
  slug,
  title,
  description,
  body,
  createdAt,
  tagList,
  favorited,
  favoritesCount,
  author: { username, image },
  active = false,
}) => {
  const { articleAsync } = useActions();
  const navigate = useNavigate();
  const ref = useRef(null);

  const currentUser = useTypedSelector((state) => state.currentUser as TUserCurrent);

  const actionBlock =
    currentUser?.username === username && active ? (
      <ArticleActionBlock
        onConfirm={() => {
          articleAsync(articleRequestDelete(currentUser?.token, slug), articleCurrentSet, navigate);
        }}
        onClick={() => {
          navigate(`edit`);
        }}
      />
    ) : null;

  const like = async () => {
    if (currentUser && active) {
      const { token } = currentUser;
      articleAsync(articleRequestFavorite(token, slug, favorited), articleCurrentSet);
    }
  };
  const [src, setSrc] = useState<string>(avatarDefaultImage);

  useEffect(() => {
    if (image !== 'https://static.productionready.io/images/smiley-cyrus.jpg') {
      getValidImageSrc(image)
        .then(() => setSrc(image))
        .catch(() => setSrc(avatarDefaultImage));
    }
  }, []);

  const showTitle = title.trim() || slug;
  const showDescription = description.trim() || `Description for this article is not present!`;
  const showBody = body.trim() || `Text for this article is not present!`;
  const showUsername = username.trim() || `${slug}-author`;
  const formatedDate = format(new Date(createdAt), 'MMMM d, yyyy');
  const content = active ? <ReactMarkdown className={classes.content}>{showBody}</ReactMarkdown> : null;

  const tagElements = tagList.map((tag) => (
    <li key={Math.random()} className={classes.tag}>
      {tag.trim() || 'Empty tag'}
    </li>
  ));

  return (
    <div className={classes.article}>
      <div className={classes.info}>
        <div className={classes.header}>
          <div className={classes['header-info']}>
            <Link className={classes.title} to={`/articles/${slug}`}>
              {showTitle}
            </Link>
            <button
              type="button"
              onClick={() => like()}
              className={`${favorited ? classes['like-delete'] : classes['like-post']} ${classes.like} ${
                currentUser && active ? '' : classes['like-cursor']
              }`}
            />
            <span className={classes['like-count']}>{favoritesCount}</span>
          </div>
          <ul className={classes['tags-list']}>{tagElements}</ul>
        </div>
        <div className={classes['user-info']}>
          <div className={classes['info-wrapper']}>
            <h4 ref={ref} className={classes['user-name']}>
              {showUsername}
            </h4>
            <span className={classes.date}>{formatedDate}</span>
            {actionBlock}
          </div>
          <div className={classes.avatar}>
            <img className={classes.image} src={src} alt="avatar" />
          </div>
        </div>
      </div>
      <div className={classes.description}>{showDescription}</div>
      {content}
    </div>
  );
};
