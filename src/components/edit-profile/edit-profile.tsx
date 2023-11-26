import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { IUserBase, IUserBaseEdit, IUserErrors } from '../../types/types';

import classes from './edit-profile.module.scss';

export const EditProfile: React.FunctionComponent = () => {
  const currentUser = useTypedSelector((state) => state.currentUser);
  const { username: currentUsername, email: currentEmail, image: currentImage } = currentUser as IUserBaseEdit;
  const currentUserErrors = useTypedSelector((state) => state.currentUserErrors);

  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: { ...(currentUser as IUserBaseEdit) },
  });

  const { getCurrentUser } = useActions();

  useEffect(() => {
    if (currentUserErrors) {
      const { errors: userErrors } = currentUserErrors as IUserErrors;
      if (userErrors.username) setError('username', { message: `Username is already taken` });
      if (userErrors.email) setError('email', { message: `Email is already taken` });
    } else {
      clearErrors();
    }
  }, [currentUserErrors]);

  const { token } = currentUser as IUserBase;

  const onSubmit = (data: { [key: string]: string }) => {
    const newData = Object.fromEntries(Object.entries(data).filter((entrie) => entrie[1]));
    const user = {
      user: {
        ...newData,
      },
    };
    getCurrentUser(user, 'put', token);
  };
  const showError = (name: keyof typeof errors): JSX.Element | null =>
    errors[name] ? <p className={classes.error}>{errors?.[name]?.message || 'Error'}</p> : null;

  const addValidationClass = (name: keyof typeof dirtyFields): string => {
    switch (true) {
      case !errors[name] && dirtyFields[name]:
        return classes['input-valid'];
      case !!errors[name]:
        return classes['input-error'];
      default:
        return '';
    }
  };
  return (
    <form className={classes.form} name="edit-form" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={classes.fieldset}>
        <legend className={classes.title}>Edit profile</legend>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="username">
          Username
          <input
            className={`${classes.input} ${classes.field} ${addValidationClass('username')}`}
            type="text"
            id="username"
            placeholder="Username"
            {...register('username', {
              minLength: {
                value: 3,
                message: 'Username needs to be at least 3 characters!',
              },
              maxLength: {
                value: 20,
                message: 'Username must not be longer than 20 characters!',
              },
              pattern: {
                value: /^[a-z][a-z0-9]*/,
                message: 'Username must contain only lowercase English letters and numbers!',
              },
              validate: (val) => (val === currentUsername ? 'The entered value is already current username!' : true),
            })}
          />
          {showError('username')}
        </label>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="email">
          Email address
          <input
            className={`${classes.input} ${classes.field} ${addValidationClass('email')}`}
            type="text"
            id="email"
            placeholder="Email address"
            {...register('email', {
              pattern: {
                value: /^[a-z0-9]+([._-]?[a-z0-9]+)*@[a-z]*(\.[a-z]{2,5})$/,
                message: 'Email is not correct!',
              },
              validate: (val) => (val === currentEmail ? 'The entered value is already current email!' : true),
            })}
          />
          {showError('email')}
        </label>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="password">
          New password
          <input
            className={`${classes.input} ${classes.field} ${addValidationClass('password')}`}
            type="password"
            id="password"
            placeholder="New password"
            {...register('password', {
              pattern: {
                value: /[a-z0-9_-]/,
                message: 'Password is not correct!',
              },
              minLength: {
                value: 6,
                message: 'Password needs to be at least 6 characters!',
              },
              maxLength: {
                value: 40,
                message: 'Password must not be longer than 40 characters!',
              },
            })}
          />
          {showError('password')}
        </label>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="image">
          Avatar image (url)
          <input
            className={`${classes.input} ${classes.field} ${addValidationClass('image')}`}
            type="text"
            id="image"
            placeholder="Avatar image"
            {...register('image', {
              validate: async (val) => {
                if (val) {
                  if (val === currentImage) return 'The entered value is already current image URL!';
                  const img = new Image();
                  img.src = val;
                  return new Promise((resolve) => {
                    img.onload = () => resolve(true);
                    img.onerror = () => resolve('Avatar url is not correct!');
                  });
                }
                return true;
              },
            })}
          />
          {showError('image')}
        </label>
        <button className={`${classes.input} ${classes.button}`} type="submit">
          Save
        </button>
      </fieldset>
    </form>
  );
};
