import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { Entries } from 'type-fest';

import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { TUserEdit, IErrors, TErrorEdit, TUserCurrentIs } from '../../types/types';
import { userRequestPut } from '../../services/real-world-blog-api';
import { getValidImageSrc } from '../../services/get-valid-image-src';

import classes from './profile-edit.module.scss';

export const ProfileEdit: React.FunctionComponent = () => {
  const { token, ...currentValues } = useTypedSelector((state) => state.currentUser as TUserCurrentIs);
  const { username: currentUsername, email: currentEmail, image: currentImage } = currentValues;
  const currentErrors = useTypedSelector((state) => state.currentErrors as IErrors<TErrorEdit>);
  const refForm = useRef() as React.MutableRefObject<HTMLFormElement>;

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setError,
    clearErrors,
    reset,
  } = useForm<TUserEdit>({
    mode: 'onSubmit',
    defaultValues: { ...currentValues },
  });

  const { userAsync, errorsClear } = useActions();

  useEffect(() => {
    if (currentErrors) {
      const { errors: userErrors } = currentErrors;
      Object.keys(userErrors).forEach((name) =>
        setError(name as keyof TErrorEdit, { message: `${name} ${userErrors[name as keyof TErrorEdit]}` })
      );
    } else {
      clearErrors();
    }
  }, [currentErrors]);

  useEffect(() => {
    return () => {
      errorsClear();
    };
  }, []);

  const onSuccess = (argValue: TUserEdit) => {
    reset(argValue);
    refForm.current.classList.add(classes['form-success']);
    setTimeout(() => {
      refForm.current.classList.remove(classes['form-success']);
    }, 2000);
  };

  const onSubmit = (data: TUserEdit) => {
    const dataEntries = Object.entries(data) as Entries<typeof data>;
    const filteredData = dataEntries.filter((entrie) => entrie[1]?.trim());
    if (filteredData.length) {
      const user = Object.fromEntries(filteredData);
      userAsync(userRequestPut({ user }, token), onSuccess);
    }
  };

  const [type, setType] = useState<'password' | 'text'>('password');

  return (
    <form ref={refForm} className={classes.form} name="edit-form" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={classes.fieldset}>
        <legend className={classes.title}>Edit profile</legend>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="username">
          Username
          <input
            className={`${classes.input} ${classes.field} ${errors.username ? classes['input-error'] : ''}`}
            type="text"
            id="username"
            autoComplete="username"
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
              validate: (val) => {
                if (val) {
                  switch (true) {
                    case val.includes(' '):
                      return 'Username cannot contain spaces!';
                    case val === currentUsername:
                      return 'The entered value is already current username!';
                    default:
                      return true;
                  }
                }
                return true;
              },
            })}
          />
          <button
            type="button"
            className={classes.reset}
            onClick={() => {
              reset({ username: '' });
            }}
          />
          <ErrorMessage errors={errors} name="username" as="p" className={classes.error} />
        </label>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="email">
          Email address
          <input
            className={`${classes.input} ${classes.field} ${errors.email ? classes['input-error'] : ''}`}
            type="text"
            id="email"
            autoComplete="email"
            placeholder="Email address"
            {...register('email', {
              pattern: {
                value: /^[a-z0-9]+([._-]?[a-z0-9]+)*@[a-z]*(\.[a-z]{2,5})$/,
                message: 'Email is not correct!',
              },
              validate: (val) => (val === currentEmail ? 'The entered value is already current email!' : true),
            })}
          />
          <button
            type="button"
            className={classes.reset}
            onClick={() => {
              reset({ email: '' });
            }}
          />
          <ErrorMessage errors={errors} name="email" as="p" className={classes.error} />
        </label>
        <label className={`${classes.label} ${classes.password} ${classes['input-label']}`} htmlFor="password">
          New password
          <input
            className={`${classes.input} ${classes.field} ${errors.password ? classes['input-error'] : ''}`}
            type={type}
            // type="password"
            id="password"
            autoComplete="new-password"
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
              validate: (val) => (val?.includes(' ') ? 'Password cannot contain spaces!' : true),
            })}
          />
          <button
            type="button"
            className={classes['password-toggle']}
            onClick={() => {
              setType((prev) => (prev === 'password' ? 'text' : 'password'));
            }}
          />
          <ErrorMessage errors={errors} name="password" as="p" className={classes.error} />
        </label>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="image">
          Avatar image (url)
          <input
            className={`${classes.input} ${classes.field} ${errors.image ? classes['input-error'] : ''}`}
            type="text"
            id="image"
            autoComplete="photo"
            placeholder="Avatar image"
            {...register('image', {
              validate: async (val) => {
                if (val) {
                  if (val === currentImage) return 'The entered value is already current image URL!';
                  const data = (await getValidImageSrc(val)) as unknown as boolean;
                  if (data) return true;
                  return 'Avatar url is not correct!';
                }
                return true;
              },
            })}
          />
          <button
            type="button"
            className={classes.reset}
            onClick={() => {
              reset({ image: '' });
            }}
          />
          <ErrorMessage errors={errors} name="image" as="p" className={classes.error} />
        </label>
        <button disabled={!isDirty} className={`${classes.input} ${classes.button}`} type="submit">
          Save
        </button>
      </fieldset>
    </form>
  );
};
