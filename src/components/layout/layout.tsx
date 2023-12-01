import { Outlet } from 'react-router-dom';

import { Header } from '../header/header';
// import { useTypedSelector } from '../../hooks/use-typed-selector';
// import { ErrorMessage } from '../error-message/error-message';
import { IsErrorStatus } from '../../hoc/is-error-status/is-error-status';

import classes from './layout.module.scss';

export const Layout: React.FunctionComponent = () => {
  // const { error } = useTypedSelector((state) => state.status);

  // const content = (
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

  // const showContent = error ? <ErrorMessage /> : content;

  // return showContent;
};
