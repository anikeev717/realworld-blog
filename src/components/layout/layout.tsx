import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '../header/header';
import { IsErrorStatus } from '../../hoc/is-error-status';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';

import classes from './layout.module.scss';

export const Layout: React.FunctionComponent = () => {
  const { error } = useTypedSelector((state) => state.status);
  const { statusSuccess } = useActions();
  const location = useLocation();
  return (
    <div className={classes.app}>
      <Header />
      <div className={classes.container}>
        <IsErrorStatus serverError={error} path={location.pathname} clearServerError={statusSuccess}>
          <Outlet />
        </IsErrorStatus>
      </div>
    </div>
  );
};
