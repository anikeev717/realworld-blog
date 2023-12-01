import { Outlet } from 'react-router-dom';

import { Header } from '../header/header';
import { IsErrorStatus } from '../../hoc/is-error-status/is-error-status';

import classes from './layout.module.scss';

export const Layout: React.FunctionComponent = () => {
  return (
    <div className={classes.app}>
      <Header />
      <div className={classes.container}>
        <IsErrorStatus>
          <Outlet />
        </IsErrorStatus>
      </div>
    </div>
  );
};
