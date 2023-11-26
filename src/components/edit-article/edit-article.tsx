import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import { IArticle, IArticleBaseNew, IUserBase } from '../../types/types';
import { Loader } from '../loader/loader';
import { ArticleForm } from '../article-form/article-form';

type TEditArticleProps = {
  slug: string;
};

export const EditArticle: React.FunctionComponent<TEditArticleProps> = ({ slug }) => {
  const currentUser = useTypedSelector((state) => state.currentUser);
  const currentArticle = useTypedSelector((state) => state.article);
  const { loading } = useTypedSelector((state) => state.status);
  const { putCurrentArticle } = useActions();
  const navigate = useNavigate();

  const { title: curTitile, body: curBody, description: curDescription, tagList: curTags } = currentArticle as IArticle;

  const formData = useForm<IArticleBaseNew>({
    mode: 'all',
    defaultValues: {
      title: curTitile,
      body: curBody,
      description: curDescription,
      tags: curTags.map((tag) => ({
        name: tag,
      })),
    },
  });
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
    putCurrentArticle(article, token, slug, navigate); //
  };

  const content = loading ? <Loader /> : <ArticleForm formData={formData} fieldData={fieldData} onSubmit={onSubmit} />;
  return content;
};
