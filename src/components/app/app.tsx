import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import { Layout } from '../layout/layout';
import { List } from '../list/list';
import { WithArticle } from '../with-article/with-article';
import { SignUp } from '../sign-up/sign-up';
import { SignIn } from '../sign-in/sign-in';
import { EditProfile } from '../edit-profile/edit-profile';
import { useActions } from '../../hooks/use-actions';
import { NewArticle } from '../new-article/new-article';
import { WithEditForm } from '../with-edit-form/with-edit-form';
import { IsUserStatus } from '../../hoc/is-user-status/is-user-status';
import { NotFoundPage } from '../not-found-page/not-found-page';

export const App: React.FunctionComponent = () => {
  const { userSetLogin } = useActions();

  useEffect(() => {
    const localStorageUser = localStorage.getItem('userKey');
    if (localStorageUser) userSetLogin(JSON.parse(localStorageUser));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<List />} />
        <Route path="articles" element={<Navigate to="/" />} />
        <Route path="articles/:slug" element={<WithArticle />} />
        <Route path="articles/:slug/edit" element={<WithEditForm />} />
        <Route
          path="new-article"
          element={
            <IsUserStatus status={false}>
              <NewArticle />
            </IsUserStatus>
          }
        />
        <Route
          path="sign-up"
          element={
            <IsUserStatus status>
              <SignUp />
            </IsUserStatus>
          }
        />
        <Route
          path="sign-in"
          element={
            <IsUserStatus status>
              <SignIn />
            </IsUserStatus>
          }
        />
        <Route
          path="profile"
          element={
            <IsUserStatus status={false}>
              <EditProfile />
            </IsUserStatus>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
