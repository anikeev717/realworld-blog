import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useRef } from 'react';
import rehypeRaw from 'rehype-raw';
import { Tooltip } from 'antd';

import { IArticleIs, TArticleCurrent, TUserCurrent } from '../../types/types';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import { useLike } from '../../hooks/use-like';
import { useImage } from '../../hooks/use-image';
import { useDateString } from '../../hooks/use-date-string';
import { isOverflowed } from '../../services/is-overflowed';
import { articleRequestDelete, articleRequestFavorite } from '../../services/real-world-blog-api';
import { articleCurrentSet } from '../../redux/actions';
import { ArticleActionBlock } from '../article-action-block/article-action-block';

import classes from './article.module.scss';

interface IArticleProps {
  article: IArticleIs;
  active?: boolean;
}

export const Article: React.FunctionComponent<IArticleProps> = ({
  article: {
    slug,
    title,
    description,
    body,
    createdAt,
    tagList,
    favorited,
    favoritesCount,
    author: { username, image },
  },
  active,
}) => {
  const currentUser = useTypedSelector((state) => state.currentUser as TUserCurrent);
  const currentArticle = useTypedSelector((state) => state.currentArticle as TArticleCurrent);

  const { articleAsync } = useActions();
  const navigate = useNavigate();
  const ref = useRef(null);
  const refTag = useRef(null);
  const { like, likeCount } = useLike(currentArticle, slug, favorited, favoritesCount);
  const validImage = useImage(image);
  const validCreatedAt = useDateString(createdAt);

  const actionBlock =
    currentUser?.username === username && active ? (
      <ArticleActionBlock
        onConfirm={() => articleAsync(articleRequestDelete(currentUser?.token, slug), articleCurrentSet, navigate)}
        onClick={() => navigate(`edit`)}
      />
    ) : null;

  const toLike = async () => {
    if (currentUser) {
      const { token } = currentUser;
      articleAsync(articleRequestFavorite(token, slug, like), articleCurrentSet);
    }
  };

  const showTitleTooltip = isOverflowed(ref) ? title : null;
  const content = active ? (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} className={classes.content}>
      {body}
    </ReactMarkdown>
  ) : null;

  const tagElements = tagList.map((tag) => {
    const tagTitleTooltip = isOverflowed(refTag) ? tag : null;
    return (
      <Tooltip title={tagTitleTooltip} key={Math.random()}>
        <li ref={refTag} className={classes.tag}>
          {tag}
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
                {title}
              </Link>
            </Tooltip>
            <button
              type="button"
              onClick={toLike}
              className={`${like ? classes['like-delete'] : classes['like-post']} ${classes.like} ${
                currentUser ? classes['like-hover'] : classes['like-cursor']
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_9605_1)">
                  <path
                    className={classes.field}
                    id="path4"
                    d="M8 3.56911C7.26154 2.33835 6.03077 1.47681 4.55385 1.47681C2.46154 1.47681 0.861542 3.07681 0.861542 5.16911C0.861542 9.23065 3.07693 9.84604 8 14.523C12.9231 9.84604 15.1385 9.23065 15.1385 5.16911C15.1385 3.07681 13.5385 1.47681 11.4462 1.47681C9.96923 1.47681 8.73846 2.33835 8 3.56911Z"
                    fill="#FFFFFF"
                  />
                  <path
                    className={classes.border}
                    d="M7.99998 15.1099C7.7722 15.1099 7.5526 15.0273 7.38146 14.8774C6.73509 14.3123 6.11193 13.7811 5.56212 13.3126L5.55932 13.3102C3.94738 11.9365 2.55542 10.7502 1.58691 9.58167C0.504272 8.27527 0 7.03662 0 5.68347C0 4.36877 0.450805 3.15588 1.26928 2.26807C2.09753 1.36975 3.234 0.875 4.46972 0.875C5.3933 0.875 6.23912 1.16699 6.98363 1.7428C7.35936 2.03345 7.69994 2.38916 7.99998 2.80408C8.30015 2.38916 8.64061 2.03345 9.01646 1.7428C9.76097 1.16699 10.6068 0.875 11.5304 0.875C12.766 0.875 13.9026 1.36975 14.7308 2.26807C15.5493 3.15588 16 4.36877 16 5.68347C16 7.03662 15.4958 8.27527 14.4132 9.58154C13.4447 10.7502 12.0528 11.9364 10.4411 13.3099C9.89036 13.7792 9.26622 14.3112 8.61839 14.8777C8.44737 15.0273 8.22765 15.1099 7.99998 15.1099ZM4.46972 1.81226C3.49889 1.81226 2.60705 2.19971 1.95825 2.90332C1.2998 3.61755 0.937132 4.60486 0.937132 5.68347C0.937132 6.82153 1.3601 7.83936 2.30847 8.98364C3.22509 10.0897 4.58849 11.2516 6.1671 12.5969L6.17003 12.5994C6.72191 13.0697 7.34752 13.6029 7.99864 14.1722C8.65367 13.6018 9.28026 13.0677 9.83323 12.5967C11.4117 11.2513 12.775 10.0897 13.6916 8.98364C14.6399 7.83936 15.0628 6.82153 15.0628 5.68347C15.0628 4.60486 14.7002 3.61755 14.0417 2.90332C13.393 2.19971 12.5011 1.81226 11.5304 1.81226C10.8192 1.81226 10.1662 2.03833 9.5897 2.48413C9.07591 2.88159 8.718 3.38403 8.50816 3.7356C8.40025 3.91638 8.21031 4.02429 7.99998 4.02429C7.78966 4.02429 7.59972 3.91638 7.49181 3.7356C7.28209 3.38403 6.92418 2.88159 6.41027 2.48413C5.83373 2.03833 5.18078 1.81226 4.46972 1.81226Z"
                    fill="black"
                    fillOpacity="0.85"
                  />
                </g>
              </svg>
            </button>
            <span className={classes['like-count']}>{likeCount}</span>
          </div>
          <ul className={classes['tags-list']}>{tagElements}</ul>
        </div>
        <div className={classes['user-info']}>
          <div className={classes['info-wrapper']}>
            <h4 className={classes['user-name']}>{username}</h4>
            <span className={classes.date}>{validCreatedAt}</span>
            {actionBlock}
          </div>
          <div className={classes.avatar}>
            <img className={classes.image} src={validImage} alt="avatar" />
          </div>
        </div>
      </div>
      <div className={classes.description}>{description}</div>
      {content}
    </div>
  );
};
