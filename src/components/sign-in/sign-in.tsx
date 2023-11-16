import { Link } from 'react-router-dom';

import classes from './sign-in.module.scss';

export const SignIn: React.FunctionComponent = () => {
  return (
    <form className={classes.form} name="signin-form">
      <fieldset className={classes.fieldset}>
        <legend className={classes.title}>Sign In</legend>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="email">
          Email address
          <input
            className={`${classes.input} ${classes.field}`}
            type="email"
            name="signin-input"
            id="email"
            placeholder="Email address"
            required
          />
        </label>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="password">
          Password
          <input
            className={`${classes.input} ${classes.field}`}
            type="password"
            name="signin-input"
            id="password"
            placeholder="Password"
            required
          />
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
