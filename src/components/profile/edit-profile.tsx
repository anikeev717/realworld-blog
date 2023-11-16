import classes from './edit-profile.module.scss';

export const EditProfile: React.FunctionComponent = () => {
  return (
    <form className={classes.form} name="edit-form">
      <fieldset className={classes.fieldset}>
        <legend className={classes.title}>Edit profile</legend>
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
          New password
          <input
            className={`${classes.input} ${classes.field}`}
            type="password"
            name="signup-input"
            id="password"
            placeholder="New password"
            required
          />
        </label>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="repeat">
          Avatar image (url)
          <input
            className={`${classes.input} ${classes.field}`}
            type="password"
            name="signup-input"
            id="repeat"
            placeholder="Avatar image"
            required
          />
        </label>
        <button className={`${classes.input} ${classes.button}`} type="submit">
          Save
        </button>
      </fieldset>
    </form>
  );
};
