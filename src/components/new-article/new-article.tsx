import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import { IArticleBaseNew, IUserBase } from '../../types/types';
import { Loader } from '../loader/loader';
import { ArticleForm } from '../article-form/article-form';

export const NewArticle: React.FunctionComponent = () => {
  const currentUser = useTypedSelector((state) => state.currentUser);
  const { loading } = useTypedSelector((state) => state.status);
  const { postCurrentArticle } = useActions();
  const navigate = useNavigate();

  const formData = useForm<IArticleBaseNew>({ mode: 'all', defaultValues: { tags: [{ name: '' }] } });
  const { control } = formData;

  const fieldData = useFieldArray({
    control,
    name: 'tags',
  });

  const { token } = currentUser as IUserBase;

  const onSubmit = (data: IArticleBaseNew) => {
    const { title, description, body, tags } = data;
    const tagList = tags.map((el) => el.name);
    const article = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };
    postCurrentArticle(article, token, navigate); //
    formData.reset();
  };

  const content = loading ? <Loader /> : <ArticleForm formData={formData} fieldData={fieldData} onSubmit={onSubmit} />;

  return content;
};
