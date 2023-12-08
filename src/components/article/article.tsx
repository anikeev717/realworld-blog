import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useRef } from 'react';
import rehypeRaw from 'rehype-raw';
import { Tooltip } from 'antd';

import { IArticleIs, TArticleCurrent, TUserCurrent } from '../../types/types';
import { useTransform } from '../../hooks/use-transform';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import { useLike } from '../../hooks/use-like';
import { isOverflowed } from '../../services/is-overflowed';
import { articleRequestDelete, articleRequestFavorite } from '../../services/real-world-blog-api';
import { articleCurrentSet } from '../../redux/actions';
import { ArticleActionBlock } from '../article-action-block/article-action-block';

import classes from './article.module.scss';

interface IArticleProps {
  article: IArticleIs;
  active?: boolean;
}

export const Article: React.FunctionComponent<IArticleProps> = ({ article, active }) => {
  const {
    slug,
    title,
    description,
    body,
    createdAt,
    tagList,
    favorited,
    favoritesCount,
    author: { username, image },
  } = useTransform(article);
  const { articleAsync } = useActions();
  const navigate = useNavigate();
  const ref = useRef(null);
  const refTag = useRef(null);

  const currentUser = useTypedSelector((state) => state.currentUser as TUserCurrent);
  const currentArticle = useTypedSelector((state) => state.currentArticle as TArticleCurrent);

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

  const { like, likeCount } = useLike(currentArticle, slug, favorited, favoritesCount);

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
              onClick={() => toLike()}
              className={`${like ? classes['like-delete'] : classes['like-post']} ${classes.like} ${
                currentUser ? '' : classes['like-cursor']
              }`}
            />
            <span className={classes['like-count']}>{likeCount}</span>
          </div>
          <ul className={classes['tags-list']}>{tagElements}</ul>
        </div>
        <div className={classes['user-info']}>
          <div className={classes['info-wrapper']}>
            <h4 className={classes['user-name']}>{username}</h4>
            <span className={classes.date}>{createdAt}</span>
            {actionBlock}
          </div>
          <div className={classes.avatar}>
            <img className={classes.image} src={image} alt="avatar" />
          </div>
        </div>
      </div>
      <div className={classes.description}>{description}</div>
      {content}
    </div>
  );
};
