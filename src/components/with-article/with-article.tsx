import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { Article } from '../article/article';
import { useActions } from '../../hooks/use-actions';
import { IArticle } from '../../types/types';
import { Loader } from '../loader/loader';

export const WithArticle: React.FunctionComponent = () => {
  const { slug } = useParams();
  const article = useTypedSelector((state) => state.article);
  const { loading } = useTypedSelector((state) => state.status);
  const { getCurrentArticle } = useActions();

  useEffect(() => {
    if (slug) getCurrentArticle(slug);
  }, [slug]);

  const showArticle = article ? <Article {...(article as IArticle)} active /> : null;
  const content = loading ? <Loader /> : showArticle;

  return content;
};
