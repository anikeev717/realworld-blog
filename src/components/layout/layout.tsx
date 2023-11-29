import { Outlet } from 'react-router-dom';

import { Header } from '../header/header';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { ErrorMessage } from '../error/error';

import classes from './layout.module.scss';

export const Layout: React.FunctionComponent = () => {
  const { error } = useTypedSelector((state) => state.status);

  const content = (
    <div className={classes.app}>
      <Header />
      <div className={classes.container}>
        <Outlet />
      </div>
    </div>
  );

  const showContent = error ? <ErrorMessage /> : content;

  return showContent;
};
