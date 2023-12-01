import React from 'react';
import { Link } from 'react-router-dom';

import avatarDefaultImage from '../../assets/images/avatar.svg';
import { TUserCurrentIs } from '../../types/types';
import { useActions } from '../../hooks/use-actions';

import classes from './header-auth-block.module.scss';

export const HeaderAuthBlock = (currentUser: TUserCurrentIs) => {
  const { username, image } = currentUser;

  const { userSetLogout, pageSet } = useActions();

  const avatarImage = image || avatarDefaultImage;

  return (
    <>
      <Link to="/new-article" className={`${classes.link} ${classes['link-success']} ${classes['link-small']}`}>
        Create article
      </Link>
      <Link to="/profile" className={`${classes['link-avatar']} ${classes.link}`}>
        {username}
        <div className={classes.avatar}>
          <img className={classes.image} src={avatarImage} alt="avatar" />
        </div>
      </Link>
      <Link
        to="/sign-in"
        onClick={() => {
          userSetLogout();
          localStorage.removeItem('user');
          pageSet(1);
        }}
        className={`${classes.link} ${classes['link-heading']}`}
      >
        Log Out
      </Link>
    </>
  );
};
