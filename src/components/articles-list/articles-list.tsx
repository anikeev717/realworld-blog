import { useEffect } from 'react';
// import { Pagination } from 'antd';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import { TArticleCurrent, TUserCurrent } from '../../types/types';
import { Article } from '../article/article';
import { Loader } from '../loader/loader';
import { articlesAllRequestGet } from '../../services/realworld-blog-api/real-world-blog-api';
import { articlesSet } from '../../redux/actions';
import { PaginationItem } from '../pagination-item/pagination-item';

import classes from './articles-list.module.scss';

export const ArticlesList: React.FunctionComponent = () => {
  const { articles, articlesCount } = useTypedSelector((state) => state.articlesInfo);
  const currentArticle = useTypedSelector((state) => state.currentArticle as TArticleCurrent);
  const page = useTypedSelector((state) => state.page);
  const { loading } = useTypedSelector((state) => state.status);
  const currentUser = useTypedSelector((state) => state.currentUser as TUserCurrent);

  const { articleAsync, pageSet, articlesClear } = useActions();

  const limit: number = 5;
  const offset: number = (page - 1) * limit;

  useEffect(() => {
    articleAsync(articlesAllRequestGet(offset, currentUser?.token, limit), articlesSet);

    return () => {
      articlesClear();
    };
  }, [offset, limit, currentUser?.token, currentArticle]);

  const articlesElements = articles.map((article) => {
    return (
      <li key={article.createdAt}>
        <Article {...article} />
      </li>
    );
  });

  const list = (
    <>
      <ul className={classes.list}>{articlesElements}</ul>
      <div className={classes['pagination-wrapper']}>
        <PaginationItem limit={limit} articlesCount={articlesCount} page={page} onChangeFunc={pageSet} />
      </div>
    </>
  );

  const content = loading ? <Loader /> : list;

  return content;
};
