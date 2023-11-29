import { Navigate, useParams } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { EditArticle } from '../edit-article/edit-article';

export const WithEditForm = () => {
  const { slug } = useParams();
  const currentArticle = useTypedSelector((state) => state.currentArticle);

  if (!currentArticle) return <Navigate to={`/articles/${slug}`} />;

  return <EditArticle slug={slug!} />;
};
