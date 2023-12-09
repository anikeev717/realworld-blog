import React from 'react';
import { Link } from 'react-router-dom';

import avatarDefaultImage from '../../assets/images/avatar.svg';
import { TUserCurrentIs } from '../../types/types';
import { useActions } from '../../hooks/use-actions';
import { deleteToken } from '../../services/token-functions';

import classes from './header-auth-block.module.scss';

export const HeaderAuthBlock = (currentUser: TUserCurrentIs) => {
  const { userSetLogout, pageSet } = useActions();
  const { username, image } = currentUser;
  const avatarImage = image || avatarDefaultImage;

  return (
    <>
      <Link
        data-tooltip="Create article"
        to="/new-article"
        className={`${classes.link} ${classes['link-success']} ${classes['link-small']}`}
      >
        Create article
      </Link>
      <Link data-tooltip={username} to="/profile" className={`${classes['link-avatar']} ${classes.link}`}>
        {username}
        <div className={classes.avatar}>
          <img className={classes.image} src={avatarImage} alt="avatar" />
        </div>
      </Link>
      <Link
        data-tooltip="Log out"
        to="/sign-in"
        onClick={() => {
          userSetLogout();
          deleteToken();
          pageSet(1);
        }}
        className={`${classes.link} ${classes['link-heading']}`}
      >
        Log Out
      </Link>
    </>
  );
};
