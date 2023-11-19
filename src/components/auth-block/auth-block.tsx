import React from 'react';
import { Link } from 'react-router-dom';

import avatarDefaultImage from '../../assets/images/avatar.svg';
import { IUserBase } from '../../types/types';
import { useActions } from '../../hooks/use-actions';

import classes from './auth-block.module.scss';

export const AuthBlock = (currentUser: IUserBase) => {
  const { username, image } = currentUser;

  const { userLogout } = useActions();

  const avatarImage = image || avatarDefaultImage;

  return (
    <>
      <Link to="/" className={`${classes.link} ${classes['link-success']} ${classes['link-small']}`}>
        Create article
      </Link>
      <Link to="/profile" className={`${classes['link-avatar']} ${classes.link}`}>
        {username}
        <div className={classes.avatar}>
          <img className={classes.image} src={avatarImage} alt="avatar" />
        </div>
      </Link>
      <Link to="/sign-in" onClick={() => userLogout()} className={`${classes.link} ${classes['link-heading']}`}>
        Log Out
      </Link>
    </>
  );
};
