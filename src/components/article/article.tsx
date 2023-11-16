// import avatar from '../../assets/images/avatar.svg';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { IArticle } from '../../types/types';

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
  favoritesCount,
  author: { username, image },
  active = false,
}) => {
  const tagElements = tagList.map((tag) => (
    <li key={Math.random()} className={classes.tag}>
      {tag}
    </li>
  ));

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
            <span className={classes.like}>{favoritesCount}</span>
          </div>
          <ul className={classes['tags-list']}>{tagElements}</ul>
        </div>
        <div className={classes['user-info']}>
          <div className={classes['info-wrapper']}>
            <h4 className={classes['user-name']}>{username}</h4>
            <span className={classes.date}>{formatedDate}</span>
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
