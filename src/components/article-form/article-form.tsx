import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import { IArticleNewForm, TUserCurrentIs } from '../../types/types';
import { Loader } from '../loader/loader';
import { articleFormSchema } from '../../services/form-schema-objects';
import { articleRequestPost, articleRequestPut } from '../../services/real-world-blog-api';
import { articleCurrentSet } from '../../redux/actions';

import classes from './article-form.module.scss';

type TArticleFormProps = {
  slug?: string;
  defaultValues?: {
    title: string;
    body: string;
    description: string;
    tags: { name: string }[] | [];
  };
};

export const ArticleForm: React.FunctionComponent<TArticleFormProps> = ({ slug, defaultValues }) => {
  const currentUser = useTypedSelector((state) => state.currentUser as TUserCurrentIs);
  const { loading } = useTypedSelector((state) => state.status);
  const { articleAsync } = useActions();
  const navigate = useNavigate();

  const formData = useForm<IArticleNewForm>({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(articleFormSchema),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
    control,
    getValues,
  } = formData;

  const fieldData = useFieldArray({
    control,
    name: 'tags',
  });

  const { append, fields, remove } = fieldData;

  const appendTag = () => {
    if (!fields.length || getValues(`tags.${fields.length - 1}.name`)) {
      if (fields.length < 5) {
        append({ name: '' });
      } else
        setError('root.tags', {
          message: 'Tags count limit is 5 items! You reach maximum!',
        });
    }
  };

  const removeTag = (tagIndex: number) => {
    remove(tagIndex);
    clearErrors('root.tags');
  };

  const onSubmit = (data: IArticleNewForm) => {
    const { tags, ...other } = data;
    const tagList = tags.map((el) => el.name);
    if (!tagList.filter((tag, index, arr) => arr.indexOf(tag) !== index).length) {
      const article = {
        article: {
          ...other,
          tagList,
        },
      };
      articleAsync(
        slug ? articleRequestPut(article, currentUser.token, slug) : articleRequestPost(article, currentUser.token),
        articleCurrentSet,
        navigate
      );
    } else setError('root.tags', { message: 'You need to delete all duplicate tags for submit!' });
  };

  const articleForm = (
    <form className={classes.form} name="signup-form" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={classes.fieldset}>
        <legend className={classes.title}>{`${slug ? 'Edit' : 'Create new'} article`}</legend>
        <label className={`${classes.label} ${classes['input-label']}`} htmlFor="title">
          Title
          <input
            className={`${classes.input} ${classes.field} ${errors.title ? classes['input-error'] : ''}`}
            type="text"
            id="title"
            placeholder="Title"
            autoComplete="off"
            {...register('title')}
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
            autoComplete="off"
            {...register('description')}
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
            autoComplete="off"
            {...register('body')}
          />
          <ErrorMessage errors={errors} name="body" as="p" className={classes.error} />
        </label>
        <div className={`${classes.label} ${classes['input-label']} ${classes.tags}`}>
          <p>Tags</p>
          <ErrorMessage errors={errors} name="root.tags" as="p" className={classes.error} />
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
                    autoComplete="off"
                    {...register(`tags.${index}.name` as const)}
                  />
                  <ErrorMessage errors={errors} name={`tags.${index}.name`} as="p" className={classes.error} />
                </label>
                <button
                  type="button"
                  onClick={() => {
                    removeTag(index);
                  }}
                  className={`${classes.input} ${classes['button-delete']}`}
                >
                  Delete
                </button>
              </div>
            )
          )}
          <button type="button" onClick={appendTag} className={`${classes.input} ${classes['button-add']}`}>
            Add tag
          </button>
        </div>
        <button className={`${classes.input} ${classes.button}`} type="submit">
          Send
        </button>
      </fieldset>
    </form>
  );

  const content = loading ? <Loader /> : articleForm;
  return content;
};
