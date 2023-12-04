import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect } from 'react';

import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { IErrors, IUserRegisterForm, TErrorRegister } from '../../types/types';
import { userRequestPost } from '../../services/realworld-blog-api/real-world-blog-api';

import classes from './profile-sign-up.module.scss';

export const ProfileSignUp: React.FunctionComponent = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
    watch,
  } = useForm<IUserRegisterForm>({ mode: 'all' });

  const { userAsync, errorsClear } = useActions();

  const currentErrors = useTypedSelector((state) => state.currentErrors as IErrors<TErrorRegister>);

  useEffect(() => {
    if (currentErrors?.errors?.username) setError('username', { message: `Username ${currentErrors.errors.username}` });
    if (currentErrors?.errors?.email) setError('email', { message: `Email ${currentErrors.errors.email}` });
    else clearErrors();
  }, [currentErrors]);

  useEffect(() => {
    return () => {
      errorsClear();
    };
  }, []);

  const onSubmit = (data: IUserRegisterForm) => {
    const { agree, repass, ...user } = data;
    userAsync(userRequestPost({ user }));
  };

  return (
    <form className={classes.form} name="signup-form" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={classes.fieldset}>
        <legend className={classes.title}>Create new account</legend>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="username">
          Username
          <input
            className={`${classes.input} ${classes.field} ${errors.username ? classes['input-error'] : ''}`}
            type="text"
            id="username"
            placeholder="Username"
            autoComplete="username"
            {...register('username', {
              required: 'Username is required for registration!',
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
              validate: (val) => (val?.includes(' ') ? 'Username cannot contain spaces!' : true),
            })}
          />
          <ErrorMessage errors={errors} name="username" as="p" className={classes.error} />
        </label>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="email">
          Email address
          <input
            className={`${classes.input} ${classes.field} ${errors.email ? classes['input-error'] : ''}`}
            type="text"
            id="email"
            placeholder="Email address"
            autoComplete="email"
            {...register('email', {
              required: 'Email is required for registration!',
              pattern: {
                value: /^[a-z0-9]+([._-]?[a-z0-9]+)*@[a-z]*(\.[a-z]{2,3})$/,
                message: 'Email is not correct!',
              },
            })}
          />
          <ErrorMessage errors={errors} name="email" as="p" className={classes.error} />
        </label>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="password">
          Password
          <input
            className={`${classes.input} ${classes.field} ${errors.password ? classes['input-error'] : ''}`}
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="new-password"
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
              validate: (val) => (val?.includes(' ') ? 'Password cannot contain spaces!' : true),
            })}
          />
          <ErrorMessage errors={errors} name="password" as="p" className={classes.error} />
        </label>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="repeat">
          Repeat Password
          <input
            className={`${classes.input} ${classes.field} ${errors.repass ? classes['input-error'] : ''}`}
            type="password"
            id="repeat"
            placeholder="Password"
            autoComplete="new-password"
            {...register('repass', {
              required: 'You must repeat your password for registration!',
              validate: (value: string) => (value === watch('password') ? true : 'Password do not match!'),
            })}
          />
          <ErrorMessage errors={errors} name="repass" as="p" className={classes.error} />
        </label>
        <div className={classes.line} />
        <div className={classes['wrapper-checkbox']}>
          <label className={`${classes.label} ${classes['checkbox-label']}`} htmlFor="agree">
            <input
              type="checkbox"
              id="agree"
              {...register('agree', {
                required: 'You must agree for registration!',
              })}
            />
            I agree to the processing of my personal information
            <ErrorMessage errors={errors} name="agree" as="p" className={classes.error} />
          </label>
        </div>
        <button className={`${classes.input} ${classes.button}`} type="submit">
          Create
        </button>
        <span className={classes.span}>
          Already have an account?
          <Link to="/sign-in"> Sign In.</Link>
        </span>
      </fieldset>
    </form>
  );
};
