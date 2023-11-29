import { Link } from 'react-router-dom';

import classes from './not-found-page.module.scss';

export const NotFoundPage: React.FunctionComponent = () => {
  return (
    <>
      <h1 className={classes.status}>404</h1>
      <h2 className={classes.message}>Not found</h2>
      <Link className={classes.link} to="/">
        Click for return to main page!
      </Link>
    </>
  );
};
