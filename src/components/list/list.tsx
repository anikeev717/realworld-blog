import { useEffect } from 'react';
import { Pagination } from 'antd';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import { IArticle, IUserBase } from '../../types/types';
import { Article } from '../article/article';
import { Loader } from '../loader/loader';

import classes from './list.module.scss';

export const List: React.FunctionComponent = () => {
  const { articles } = useTypedSelector((state) => state.articlesInfo);
  const { articlesCount } = useTypedSelector((state) => state.articlesInfo);
  const currentArticle = useTypedSelector((state) => state.article);
  const page = useTypedSelector((state) => state.page);
  const { loading } = useTypedSelector((state) => state.status);
  const currentUser = useTypedSelector((state) => state.currentUser);

  const { getArticles, setPage, clearArticles } = useActions();

  const limit: number = 5;
  const offset: number = (page - 1) * limit;

  let userToken: string | undefined;
  if (currentUser) {
    const { token } = currentUser as IUserBase;
    userToken = token;
  }

  useEffect(() => {
    if (userToken) getArticles(offset, limit, userToken);
    else getArticles(offset, limit);

    return () => {
      clearArticles();
    };
  }, [offset, limit, userToken, currentArticle]);

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
