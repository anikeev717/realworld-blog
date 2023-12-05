import format from 'date-fns/format';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useEffect, useRef, useState } from 'react';
import rehypeRaw from 'rehype-raw';
import { Tooltip } from 'antd';

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
  const refTag = useRef(null);

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
      getValidImageSrc(image).then((data) => (data ? setSrc(image) : setSrc(avatarDefaultImage)));
    }
  }, []);

  const isOverflowed = (refItem: React.MutableRefObject<HTMLElement | null>) => {
    if (refItem.current !== null) return refItem?.current.scrollWidth > refItem?.current.offsetWidth;
    return false;
  };

  const showTitle = title.trim().slice(0, 100) || slug;
  const showTitleTooltip = isOverflowed(ref) ? showTitle : null;
  const showDescription = description.trim().slice(0, 250) || `Description for this article is not present!`;
  const showBody = body.trim().slice(0, 5000) || `Text for this article is not present!`;
  const showUsername = username.trim().slice(0, 20) || `${slug}-author`;
  const formatedDate = format(new Date(createdAt), 'MMMM d, yyyy');
  const content = active ? (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} className={classes.content}>
      {showBody}
    </ReactMarkdown>
  ) : null;

  const tagElements = tagList.slice(0, 5).map((tag) => {
    const tagTitle = tag.trim().slice(0, 64) || 'Empty tag';
    const tagTitleTooltip = isOverflowed(refTag) ? tagTitle : null;
    return (
      <Tooltip title={tagTitleTooltip} key={Math.random()}>
        <li ref={refTag} className={classes.tag}>
          {tagTitle}
        </li>
      </Tooltip>
    );
  });

  return (
    <div className={classes.article}>
      <div className={classes.info}>
        <div className={classes.header}>
          <div className={classes['header-info']}>
            <Tooltip title={showTitleTooltip}>
              <Link ref={ref} className={classes.title} to={`/articles/${slug}`}>
                {showTitle}
              </Link>
            </Tooltip>
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
            <h4 className={classes['user-name']}>{showUsername}</h4>
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
