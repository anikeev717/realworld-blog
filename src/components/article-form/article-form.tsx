import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';

import { IArticleBaseNew } from '../../types/types';

import classes from './article-form.module.scss';

interface IArticleFormProps {
  formData: UseFormReturn<IArticleBaseNew, unknown, undefined>;
  fieldData: UseFieldArrayReturn<IArticleBaseNew, 'tags', 'id'>;
  onSubmit: (data: IArticleBaseNew) => void;
}

export const ArticleForm: React.FunctionComponent<IArticleFormProps> = ({ formData, fieldData, onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formData;

  const { append, fields, remove } = fieldData;

  return (
    <form className={classes.form} name="signup-form" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={classes.fieldset}>
        <legend className={classes.title}>Create new article</legend>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="title">
          Title
          <input
            className={`${classes.input} ${classes.field} ${errors.title ? classes['input-error'] : ''}`}
            type="text"
            id="title"
            placeholder="Title"
            {...register('title', {
              required: 'Title is required for create an article!',
              minLength: {
                value: 5,
                message: 'Title needs to be at least 5 characters!',
              },
              maxLength: {
                value: 128,
                message: 'Title must not be longer than 128 characters!',
              },
            })}
          />
          <ErrorMessage errors={errors} name="title" as="p" className={classes.error} />
        </label>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="description">
          Short description
          <input
            className={`${classes.input} ${classes.field} ${errors.description ? classes['input-error'] : ''}`}
            type="text"
            id="description"
            placeholder="Title"
            {...register('description', {
              required: 'Short description is required for create an article!',
              minLength: {
                value: 5,
                message: 'Short description needs to be at least 5 characters!',
              },
              maxLength: {
                value: 256,
                message: 'Short description must not be longer than 256 characters!',
              },
            })}
          />
          <ErrorMessage errors={errors} name="description" as="p" className={classes.error} />
        </label>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="text">
          Text
          <textarea
            className={`${classes.input} ${classes.field} ${classes['text-area']} ${
              errors.body ? classes['input-error'] : ''
            }`}
            id="text"
            placeholder="Text"
            {...register('body', {
              required: 'Text is required for create an article!',
              minLength: {
                value: 5,
                message: 'Text of article needs to be at least 5 characters!',
              },
              maxLength: {
                value: 5000,
                message: 'Text of article must not be longer than 5000 characters!',
              },
            })}
          />
          <ErrorMessage errors={errors} name="body" as="p" className={classes.error} />
        </label>
        <div className={`${classes.label} ${classes['input-label']} ${classes.tags}`}>
          Tags
          {fields.map(
            (field, index): JSX.Element => (
              <div key={field.id} className={classes['tag-wrapper']}>
                <label className={classes['tag-label']} htmlFor={`tags.${index}.name`}>
                  <input
                    className={`${classes.input} ${classes.field} ${classes['input-tag']} ${
                      errors?.tags?.[index]?.name ? classes['input-error'] : ''
                    }`}
                    id={`tags.${index}.name`}
                    type="text"
                    placeholder="Tag"
                    {...register(`tags.${index}.name` as const, {
                      required: 'Tag is cannot be empty to create an article!',
                    })}
                  />
                  <ErrorMessage errors={errors} name={`tags.${index}.name`} as="p" className={classes.error} />
                </label>
                <input
                  type="button"
                  value="Delete"
                  onClick={() => remove(index)}
                  className={`${classes.input} ${classes['button-delete']}`}
                />
              </div>
            )
          )}
          <input
            type="button"
            value="Add tag"
            onClick={() => append({ name: '' })}
            className={`${classes.input} ${classes['button-add']}`}
          />
        </div>
        <button className={`${classes.input} ${classes.button}`} type="submit">
          Send
        </button>
      </fieldset>
    </form>
  );
};
