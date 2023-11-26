import { Navigate } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/use-typed-selector';

interface IIsUserStatusProps {
  status: boolean;
  children: JSX.Element;
}

export const IsUserStatus: React.FunctionComponent<IIsUserStatusProps> = ({ status, children }) => {
  const currentUser = useTypedSelector((state) => state.currentUser);
  console.log('been here');

  if (!!currentUser === status) return <Navigate to="/" />;

  return children;
};
