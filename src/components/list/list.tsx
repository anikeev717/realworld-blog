import { useEffect } from 'react';
import { Pagination } from 'antd';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import { TArticleCurrent, TUserCurrent } from '../../types/types';
import { Article } from '../article/article';
import { Loader } from '../loader/loader';
// import { ErrorMessage } from '../error/error';
import { articlesAllRequestGet } from '../../services/realworld-blog-api/real-world-blog-api';
import { articlesSet } from '../../redux/actions';

import classes from './list.module.scss';

export const List: React.FunctionComponent = () => {
  const { articles } = useTypedSelector((state) => state.articlesInfo);
  const { articlesCount } = useTypedSelector((state) => state.articlesInfo);
  const currentArticle = useTypedSelector((state) => state.currentArticle as TArticleCurrent);
  const page = useTypedSelector((state) => state.page);
  const { loading } = useTypedSelector((state) => state.status);
  // const { loading, error } = useTypedSelector((state) => state.status);
  const currentUser = useTypedSelector((state) => state.currentUser as TUserCurrent);

  const { articleAsync, pageSet, articlesClear } = useActions();

  const limit: number = 5;
  const offset: number = (page - 1) * limit;

  let userToken: string | undefined;
  if (currentUser) {
    const { token } = currentUser;
    userToken = token;
  }

  useEffect(() => {
    articleAsync(articlesAllRequestGet(offset, userToken, limit), articlesSet);

    return () => {
      articlesClear();
    };
  }, [offset, limit, userToken, currentArticle]);

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
        <Pagination
          defaultPageSize={limit}
          showSizeChanger={false}
          defaultCurrent={1}
          total={articlesCount}
          current={page}
          onChange={(targetPage: number) => {
            pageSet(targetPage);
          }}
        />
      </div>
    </>
  );

  // if (error) return <ErrorMessage />;

  const content = loading ? <Loader /> : list;

  return content;
};
