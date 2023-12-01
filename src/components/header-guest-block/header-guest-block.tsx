import { Link } from 'react-router-dom';

import classes from './header-guest-block.module.scss';

export const HeaderGuestBlock = () => {
  return (
    <>
      <Link to="/sign-in" className={classes.link}>
        Sign In
      </Link>
      <Link to="/sign-up" className={`${classes.link} ${classes['link-success']}`}>
        Sign Up
      </Link>
    </>
  );
};
