import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '../layout/layout';
import { List } from '../list/list';
import { WithArticle } from '../with-article/with-article';
import { SignUp } from '../sign-up/sign-up';
import { SignIn } from '../sign-in/sign-in';
import { EditProfile } from '../profile/edit-profile';

export const App: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<List />} />
        <Route path="articles" element={<Navigate to="/" />} />
        <Route path="articles/:slug" element={<WithArticle />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="profile" element={<EditProfile />} />
      </Route>
    </Routes>
  );
};
