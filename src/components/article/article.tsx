import format from 'date-fns/format';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useEffect, useRef, useState } from 'react';
import rehypeRaw from 'rehype-raw';
import { Tooltip } from 'antd';

import avatarDefaultImage from '../../assets/images/avatar.svg';
import { IArticleIs, TArticleCurrent, TUserCurrent } from '../../types/types';
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

  const [src, setSrc] = useState<string>(avatarDefaultImage);
  const [like, setLike] = useState<boolean>(favorited);
  const [likeCount, setLikeCount] = useState<number>(favoritesCount);

  const toLike = async () => {
    if (currentUser) {
      const { token } = currentUser;
      articleAsync(articleRequestFavorite(token, slug, like), articleCurrentSet);
    }
  };

  useEffect(() => {
    if (image !== 'https://static.productionready.io/images/smiley-cyrus.jpg') {
      getValidImageSrc(image).then((data) => (data ? setSrc(image) : setSrc(avatarDefaultImage)));
    }
  }, []);

  useEffect(() => {
    if (currentArticle) {
      const { favorited: curFavorited, slug: curSlug, favoritesCount: curCount } = currentArticle;
      if (slug === curSlug) {
        setLike(curFavorited);
        setLikeCount(curCount);
      }
    }
  }, [currentArticle]);

  const isOverflowed = (refItem: React.MutableRefObject<HTMLElement | null>) => {
    if (refItem.current !== null) return refItem?.current.scrollWidth > refItem?.current.offsetWidth;
    return false;
  };

  const isUndefined = (articlesText: string | undefined, message: string, limit: number) => {
    if (!articlesText) return message;
    return articlesText.trim().slice(0, limit) || message;
  };

  const showTitle = isUndefined(title, slug, 128);
  const showTitleTooltip = isOverflowed(ref) ? showTitle : null;
  const showDescription = isUndefined(description, `Description for this article is not present!`, 256);
  const showBody = isUndefined(body, `Text for this article is not present!`, 4096);
  const showUsername = isUndefined(username, `${slug}-author`, 20);
  const formatedDate = format(new Date(createdAt), 'MMMM d, yyyy');
  const content = active ? (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} className={classes.content}>
      {showBody}
    </ReactMarkdown>
  ) : null;

  const tagElements = tagList.slice(0, 5).map((tag) => {
    const tagTitle = isUndefined(tag, 'Empty tag', 128);
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
