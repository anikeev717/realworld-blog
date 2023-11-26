// import avatar from '../../assets/images/avatar.svg';
import format from 'date-fns/format';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Button } from 'antd';

import { IArticle, IUserBase } from '../../types/types';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import { DeleteArticle } from '../delete-article/delete-article';

import classes from './article.module.scss';

interface IArticleProps extends IArticle {
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
  const tagElements = tagList.map((tag) => (
    <li key={Math.random()} className={classes.tag}>
      {tag}
    </li>
  ));

  const { deleteCurrentArticle, favoriteArticle } = useActions();
  const navigate = useNavigate();

  let featuresBlock = null;
  const currentUser = useTypedSelector((state) => state.currentUser);
  if (currentUser) {
    const { username: currentUsername, token } = currentUser as IUserBase;
    if (active && username === currentUsername)
      featuresBlock = (
        <div className={classes['button-wrapper']}>
          <DeleteArticle
            onConfirm={async () => {
              await deleteCurrentArticle(slug, token);
              navigate('/');
            }}
          />
          <Button
            style={{
              borderColor: 'var(--success-color, #52C41A)',
              color: 'var(--success-color, #52C41A)',
              marginLeft: '12px',
            }}
            onClick={() => {
              navigate(`/articles/${slug}/edit`);
            }}
          >
            Edit
          </Button>
        </div>
      );
  }

  let favoritedLocal = favorited;
  const like = async () => {
    if (currentUser) {
      const { token } = currentUser as IUserBase;
      favoriteArticle(token, favoritedLocal, slug);
      favoritedLocal = !favoritedLocal;
      navigate('/');
      console.log(favoritedLocal);
    }
  };

  const formatedDate = format(new Date(createdAt), 'MMMM d, yyyy');

  const content = active ? <ReactMarkdown className={classes.content}>{body}</ReactMarkdown> : null;

  return (
    <div className={classes.article}>
      <div className={classes.info}>
        <div className={classes.header}>
          <div className={classes['header-info']}>
            <Link className={classes.title} to={`/articles/${slug}`}>
              {title}
            </Link>
            <button
              type="button"
              onClick={() => like()}
              className={`${favoritedLocal ? classes['like-delete'] : classes['like-post']} ${classes.like}`}
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
            <img className={classes.image} src={image} alt="avatar" />
          </div>
        </div>
      </div>
      <div className={classes.description}>{description}</div>
      {content}
    </div>
  );
};
