import { Link } from 'react-router-dom';

import classes from './sign-up.module.scss';

export const SignUp: React.FunctionComponent = () => {
  return (
    <form className={classes.form} name="signup-form">
      <fieldset className={classes.fieldset}>
        <legend className={classes.title}>Create new account</legend>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="username">
          Username
          <input
            className={`${classes.input} ${classes.field}`}
            type="text"
            name="signup-input"
            id="username"
            placeholder="Username"
            required
          />
        </label>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="email">
          Email address
          <input
            className={`${classes.input} ${classes.field}`}
            type="email"
            name="signup-input"
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
            name="signup-input"
            id="password"
            placeholder="Password"
            required
          />
        </label>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="repeat">
          Repeat Password
          <input
            className={`${classes.input} ${classes.field}`}
            type="password"
            name="signup-input"
            id="repeat"
            placeholder="Password"
            required
          />
        </label>
        <div className={classes['wrapper-checkbox']}>
          <label className={`${classes.label} ${classes['checkbox-label']}`} htmlFor="agree">
            <input type="checkbox" name="signup-checkbox" id="agree" required />I agree to the processing of my personal
            information
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
