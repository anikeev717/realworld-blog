import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '../layout/layout';
import { ArticlesList } from '../articles-list/articles-list';
import { ArticleWrapper } from '../article-wrapper/article-wrapper';
import { ArticleEditFormWrapper } from '../article-edit-form-wrapper/article-edit-form-wrapper';
import { IsUserStatus } from '../../hoc/is-user-status';
import { ArticleForm } from '../article-form/article-form';
import { ProfileSignUp } from '../profile-sign-up/profile-sign-up';
import { ProfileSignIn } from '../profile-sign-in/profile-sign-in';
import { ProfileEdit } from '../profile-edit/profile-edit';
import { ErrorNotFoundPage } from '../error-not-found-page/error-not-found-page';
import { useToken } from '../../hooks/useToken';

export const App: React.FunctionComponent = () => {
  useToken();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticlesList />} />
        <Route path="articles" element={<Navigate to="/" />} />
        <Route path="articles/:slug" element={<ArticleWrapper />} />
        <Route path="articles/:slug/edit" element={<ArticleEditFormWrapper />} />
        <Route
          path="new-article"
          element={
            <IsUserStatus status={false}>
              <ArticleForm />
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
