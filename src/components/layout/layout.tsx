import { Outlet } from 'react-router-dom';

import { Header } from '../header/header';

import classes from './layout.module.scss';

export const Layout: React.FunctionComponent = () => {
  return (
    <div className={classes.app}>
      <Header />
      <div className={classes.container}>
        <Outlet />
      </div>
    </div>
  );
};
