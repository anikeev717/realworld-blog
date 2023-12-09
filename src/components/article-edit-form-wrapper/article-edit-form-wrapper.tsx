import { Navigate, useParams } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { TArticleCurrent } from '../../types/types';
import { ArticleForm } from '../article-form/article-form';

export const ArticleEditFormWrapper = () => {
  const { slug } = useParams();
  const currentArticle = useTypedSelector((state) => state.currentArticle as TArticleCurrent);

  if (!currentArticle) return <Navigate to={`/articles/${slug}`} />;
  const { title, body, description, tagList } = currentArticle;
  const defaultValues = {
    title,
    body,
    description,
    tags: tagList.map((tag) => ({ name: tag })),
  };

  return <ArticleForm slug={slug!} defaultValues={defaultValues} />;
};
