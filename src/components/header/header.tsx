import React from 'react';
import { Link } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { AuthBlock } from '../auth-block/auth-block';
import { TUserCurrent } from '../../types/types';
import { useActions } from '../../hooks/use-actions';

import classes from './header.module.scss';

export const Header: React.FunctionComponent = () => {
  const currentUser = useTypedSelector((state) => state.currentUser as TUserCurrent);
  const { pageSet } = useActions();

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
  const content = currentUser ? <AuthBlock {...currentUser} /> : notAuthBlock;

  return (
    <header className={classes.header}>
      <Link
        to="/"
        onClick={() => {
          pageSet(1);
        }}
        className={classes.link}
      >
        Realworld Blog
      </Link>
      <div className={classes['link-wrapper']}>{content}</div>
    </header>
  );
};
