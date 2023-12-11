import React from 'react';
import { Link } from 'react-router-dom';

// import avatarDefaultImage from '../../assets/images/avatar.svg';
import { TUserCurrentIs } from '../../types/types';
import { useActions } from '../../hooks/use-actions';
import { useImage } from '../../hooks/use-image';
import { deleteToken } from '../../services/token-functions';

import classes from './header-auth-block.module.scss';

export const HeaderAuthBlock = (currentUser: TUserCurrentIs) => {
  const { userSetLogout, pageSet } = useActions();
  const { username, image } = currentUser;
  const validAvatarImage = useImage(image || '');

  const logOut = () => {
    userSetLogout();
    deleteToken();
    pageSet(1);
  };

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
          <img className={classes.image} src={validAvatarImage} alt="avatar" />
        </div>
      </Link>
      <Link
        data-tooltip="Log out"
        to="/sign-in"
        onClick={logOut}
        className={`${classes.link} ${classes['link-heading']}`}
      >
        Log Out
      </Link>
    </>
  );
};
