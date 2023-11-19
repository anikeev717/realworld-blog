import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useActions } from '../../hooks/use-actions';

import classes from './sign-up.module.scss';

export const SignUp: React.FunctionComponent = () => {
  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
    reset,
    watch,
  } = useForm({ mode: 'all' });

  const { getCurrentUser } = useActions();

  const onSubmit = (data: { [key: string]: string }) => {
    const { username, email, password } = data;
    const user = {
      user: {
        username,
        email,
        password,
      },
    };
    getCurrentUser(user);
    reset();
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
    <form className={classes.form} name="signup-form" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={classes.fieldset}>
        <legend className={classes.title}>Create new account</legend>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="username">
          Username
          <input
            className={`${classes.input} ${classes.field} ${addValidationClass('username')}`}
            type="text"
            id="username"
            placeholder="Username"
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
              required: 'Email is required for registration!',
              pattern: {
                value: /^[a-z0-9]+([._-]?[a-z0-9]+)*@[a-z]*(\.[a-z]{2,3})$/,
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
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="repeat">
          Repeat Password
          <input
            className={`${classes.input} ${classes.field} ${addValidationClass('repass')}`}
            type="password"
            id="repeat"
            placeholder="Password"
            {...register('repass', {
              required: 'You must repeat your password for registration!',
              validate: (value: string) => (value === watch('password') ? true : 'Password do not match!'),
            })}
          />
          {showError('repass')}
        </label>
        <div className={classes['wrapper-checkbox']}>
          <label className={`${classes.label} ${classes['checkbox-label']}`} htmlFor="agree">
            <input
              type="checkbox"
              checked
              id="agree"
              {...register('agree', {
                required: 'You must agree for registration!',
              })}
            />
            I agree to the processing of my personal information
            {showError('agree')}
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
