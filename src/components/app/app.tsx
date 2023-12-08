import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import { Layout } from '../layout/layout';
import { ArticlesList } from '../articles-list/articles-list';
import { WithArticle } from '../with-article/with-article';
import { ProfileSignUp } from '../profile-sign-up/profile-sign-up';
import { ProfileSignIn } from '../profile-sign-in/profile-sign-in';
import { ProfileEdit } from '../profile-edit/profile-edit';
import { useActions } from '../../hooks/use-actions';
import { ArticleNew } from '../article-new/article-new';
import { WithEditForm } from '../with-edit-form/with-edit-form';
import { IsUserStatus } from '../../hoc/is-user-status';
import { ErrorNotFoundPage } from '../error-not-found-page/error-not-found-page';
import { userRequestGet } from '../../services/real-world-blog-api';
import { getToken } from '../../services/token-functions';

export const App: React.FunctionComponent = () => {
  const { userAsync } = useActions();

  useEffect(() => {
    const cookieToken = getToken();
    if (cookieToken) userAsync(userRequestGet(cookieToken));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticlesList />} />
        <Route path="articles" element={<Navigate to="/" />} />
        <Route path="articles/:slug" element={<WithArticle />} />
        <Route path="articles/:slug/edit" element={<WithEditForm />} />
        <Route
          path="new-article"
          element={
            <IsUserStatus status={false}>
              <ArticleNew />
            </IsUserStatus>
          }
        />
        <Route
          path="sign-up"
          element={
            <IsUserStatus status>
              <ProfileSignUp />
            </IsUserStatus>
          }
        />
        <Route
          path="sign-in"
          element={
            <IsUserStatus status>
              <ProfileSignIn />
            </IsUserStatus>
          }
        />
        <Route
          path="profile"
          element={
            <IsUserStatus status={false}>
              <ProfileEdit />
            </IsUserStatus>
          }
        />
        <Route path="*" element={<ErrorNotFoundPage />} />
      </Route>
    </Routes>
  );
};
