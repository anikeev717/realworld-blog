import React from 'react';
import { Link } from 'react-router-dom';

import avatar from '../../assets/images/avatar.svg';

import classes from './header.module.scss';

export const Header: React.FunctionComponent = () => {
  const auth = true;

  const authBlock = (
    <>
      <a href="/" className={`${classes.link} ${classes['link-success']} ${classes['link-small']}`}>
        Create article
      </a>
      <Link to="/profile" className={`${classes['link-avatar']} ${classes.link}`}>
        John Doe
        <div className={classes.avatar}>
          <img className={classes.image} src={avatar} alt="avatar" />
        </div>
      </Link>
      <a href="/" className={`${classes.link} ${classes['link-heading']}`}>
        Log Out
      </a>
    </>
  );
  const notAuthBlock = (
    <>
      <Link to="/sign-in" className={classes.link}>
        Sign In
      </Link>
      <Link to="/sign-up" className={`${classes.link} ${classes['link-success']}`}>
        Sign Up
      </Link>
    </>
  );
  const content = auth ? authBlock : notAuthBlock;

  return (
    <header className={classes.header}>
      <a href="/" className={classes.link}>
        Realworld Blog
      </a>
      <div className={classes['link-wrapper']}>{content}</div>
    </header>
  );
};
