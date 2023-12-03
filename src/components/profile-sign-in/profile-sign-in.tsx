import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect } from 'react';

import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { IErrors, TErrorLogin, TUserLogin } from '../../types/types';
import { userRequestPost } from '../../services/realworld-blog-api/real-world-blog-api';

import classes from './profile-sign-in.module.scss';

export const ProfileSignIn: React.FunctionComponent = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<TUserLogin>({ mode: 'all' });

  const { userAsync } = useActions();
  const currentErrors = useTypedSelector((state) => state.currentErrors as IErrors<TErrorLogin>);

  useEffect(() => {
    if (currentErrors?.errors?.['email or password']) {
      const inputsErrors = ['email', 'password'] as const;
      inputsErrors.forEach((name) => setError(name, { message: `email or password is invalid` }));
    } else clearErrors();
  }, [currentErrors]);

  const onSubmit = (user: TUserLogin) => {
    userAsync(userRequestPost({ user }, '/login'));
  };

  return (
    <form className={classes.form} name="signin-form" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={classes.fieldset}>
        <legend className={classes.title}>Sign In</legend>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="email">
          Email address
          <input
            className={`${classes.input} ${classes.field} ${errors?.email ? classes['input-error'] : ''}`}
            type="text"
            id="email"
            placeholder="Email address"
            autoComplete="email"
            {...register('email', {
              required: 'Email is required for login!',
              pattern: {
                value: /^[a-z0-9]+([._-]?[a-z0-9]+)*@[a-z]*(\.[a-z]{2,5})$/,
                message: 'Email is not correct!',
              },
            })}
          />
          <ErrorMessage errors={errors} name="email" as="p" className={classes.error} />
        </label>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="password">
          Password
          <input
            className={`${classes.input} ${classes.field} ${errors?.password ? classes['input-error'] : ''}`}
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="current-password"
            {...register('password', {
              required: 'Password is required for login!',
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
          <ErrorMessage errors={errors} name="password" as="p" className={classes.error} />
        </label>
        <button className={`${classes.input} ${classes.button}`} type="submit">
          Login
        </button>
        <span className={classes.span}>
          Don&apos;t have an account?
          <Link to="/sign-up"> Sign Up.</Link>
        </span>
      </fieldset>
    </form>
  );
};
