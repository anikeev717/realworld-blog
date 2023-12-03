import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { Article } from '../article/article';
import { useActions } from '../../hooks/use-actions';
import { TArticleCurrent, TUserCurrent } from '../../types/types';
import { Loader } from '../loader/loader';
import { articleRequestGet } from '../../services/realworld-blog-api/real-world-blog-api';
import { articleCurrentSet } from '../../redux/actions';

export const WithArticle: React.FunctionComponent = () => {
  const { slug } = useParams();
  const article = useTypedSelector((state) => state.currentArticle as TArticleCurrent);
  const { loading } = useTypedSelector((state) => state.status);
  const currentUser = useTypedSelector((state) => state.currentUser as TUserCurrent);

  const { articleAsync } = useActions();

  useEffect(() => {
    if (slug) articleAsync(articleRequestGet(slug, currentUser?.token), articleCurrentSet);
  }, [slug, currentUser?.token]);

  const showArticle = article ? <Article {...article} active /> : null;
  const content = loading ? <Loader /> : showArticle;

  return content;
};
