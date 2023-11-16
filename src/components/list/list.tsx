import { useEffect } from 'react';
import { Pagination } from 'antd';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import { IArticle } from '../../types/types';
import { Article } from '../article/article';
import { Loader } from '../loader/loader';

import classes from './list.module.scss';

export const List: React.FunctionComponent = () => {
  const { articles } = useTypedSelector((state) => state.articlesInfo);
  const { articlesCount } = useTypedSelector((state) => state.articlesInfo);
  const page = useTypedSelector((state) => state.page);
  const { loading } = useTypedSelector((state) => state.status);

  const { getArticles, setPage } = useActions();

  const limit: number = 5;
  const offset: number = (page - 1) * limit;

  useEffect(() => {
    getArticles(offset, limit);
  }, [offset, limit]);

  const articlesElements = articles.map((article: IArticle) => {
    return (
      <li key={article.createdAt}>
        <Article {...article} />
      </li>
    );
  });

  const list = (
    <>
      <ul className={classes.list}>{articlesElements}</ul>
      <Pagination
        defaultPageSize={limit}
        showSizeChanger={false}
        defaultCurrent={1}
        total={articlesCount}
        current={page}
        onChange={(targetPage: number) => {
          setPage(targetPage);
        }}
      />
    </>
  );

  const content = loading ? <Loader /> : list;

  return content;
};
