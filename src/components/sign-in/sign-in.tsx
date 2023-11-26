import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { IUserErrors } from '../../types/types';

import classes from './sign-in.module.scss';

export const SignIn: React.FunctionComponent = () => {
  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm({ mode: 'all' });

  const { getCurrentUser } = useActions();
  const currentUserErrors = useTypedSelector((state) => state.currentUserErrors);

  useEffect(() => {
    if (currentUserErrors) {
      const { errors: userErrors } = currentUserErrors as IUserErrors;
      const inputsErrors = ['email', 'password'];
      if (userErrors['email or password'])
        inputsErrors.forEach((name) => setError(name, { message: 'Email or password is invalid' }));
    } else {
      clearErrors();
    }
  }, [currentUserErrors]);

  const onSubmit = (user: { [key: string]: string }) => {
    getCurrentUser(
      {
        user,
      },
      'post',
      '/login'
    );
  };
  const showError = (name: string): JSX.Element | null =>
    errors[name] ? <p className={classes.error}>{(errors?.[name]?.message as string) || 'Error'}</p> : null;

  const addValidationClass = (name: string): string => {
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
    <form className={classes.form} name="signin-form" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={classes.fieldset}>
        <legend className={classes.title}>Sign In</legend>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="email">
          Email address
          <input
            className={`${classes.input} ${classes.field} ${addValidationClass('email')}`}
            type="text"
            id="email"
            placeholder="Email address"
            {...register('email', {
              required: 'Email is required for registration!',
              pattern: {
                value: /^[a-z0-9]+([._-]?[a-z0-9]+)*@[a-z]*(\.[a-z]{2,5})$/,
                message: 'Email is not correct!',
              },
            })}
          />
          {showError('email')}
        </label>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="password">
          Password
          <input
            className={`${classes.input} ${classes.field} ${addValidationClass('password')}`}
            type="password"
            id="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required for registration!',
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
