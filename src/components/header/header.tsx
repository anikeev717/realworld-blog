import React from 'react';
import { Link } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { HeaderAuthBlock } from '../header-auth-block/header-auth-block';
import { TUserCurrent } from '../../types/types';
import { useActions } from '../../hooks/use-actions';
import { HeaderGuestBlock } from '../header-guest-block/header-guest-block';

import classes from './header.module.scss';

export const Header: React.FunctionComponent = () => {
  const currentUser = useTypedSelector((state) => state.currentUser as TUserCurrent);
  const { pageSet } = useActions();

  const content = currentUser ? <HeaderAuthBlock {...currentUser} /> : <HeaderGuestBlock />;

  return (
    <header className={classes.header}>
      <Link to="/" onClick={() => pageSet(1)} className={classes.link}>
        Realworld Blog
      </Link>
      <div className={classes['link-wrapper']}>{content}</div>
    </header>
  );
};
