import format from 'date-fns/format';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Button } from 'antd';
import { useEffect, useState } from 'react';

import avatarDefaultImage from '../../assets/images/avatar.svg';
import { IArticleIs, TUserCurrent } from '../../types/types';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import { DeleteArticle } from '../delete-article/delete-article';
import { getValidImageSrc } from '../../services/get-valid-image-src/get-valid-image-src';
import { articleRequestDelete, articleRequestFavorite } from '../../services/realworld-blog-api/real-world-blog-api';
import { articleCurrentSet } from '../../redux/actions';

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

  let featuresBlock = null;
  const currentUser = useTypedSelector((state) => state.currentUser as TUserCurrent);
  if (currentUser) {
    const { username: currentUsername, token } = currentUser;
    if (active && username === currentUsername)
      featuresBlock = (
        <div className={classes['button-wrapper']}>
          <DeleteArticle
            onConfirm={() => {
              articleAsync(articleRequestDelete(token, slug), articleCurrentSet, navigate);
            }}
          />
          <Button
            style={{
              borderColor: 'var(--success-color, #52C41A)',
              color: 'var(--success-color, #52C41A)',
              marginLeft: '12px',
            }}
            onClick={() => {
              navigate(`edit`);
            }}
          >
            Edit
          </Button>
        </div>
      );
  }

  const like = async () => {
    if (currentUser) {
      const { token } = currentUser;
      articleAsync(articleRequestFavorite(token, slug, favorited), articleCurrentSet);
    }
  };
  const [src, setSrc] = useState<string>(avatarDefaultImage);

  useEffect(() => {
    getValidImageSrc(image)
      .then(() => setSrc(image))
      .catch(() => setSrc(avatarDefaultImage));
  }, []);

  const showTitle = title.trim() || slug;
  const showDescription = description.trim() || `Description for this article is not present!`;
  const showBody = body.trim() || `Text for this article is not present!`;
  const content = active ? <ReactMarkdown className={classes.content}>{showBody}</ReactMarkdown> : null;
  const formatedDate = format(new Date(createdAt), 'MMMM d, yyyy');

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
                currentUser ? '' : classes['like-cursor']
              }`}
            />
            <span className={classes['like-count']}>{favoritesCount}</span>
          </div>
          <ul className={classes['tags-list']}>{tagElements}</ul>
        </div>
        <div className={classes['user-info']}>
          <div className={classes['info-wrapper']}>
            <h4 className={classes['user-name']}>{username}</h4>
            <span className={classes.date}>{formatedDate}</span>
            {featuresBlock}
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
