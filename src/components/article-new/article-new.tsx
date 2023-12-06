import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import { IArticleNewForm, TUserCurrentIs } from '../../types/types';
import { Loader } from '../loader/loader';
import { ArticleForm } from '../article-form/article-form';
import { articleFormSchema } from '../../services/form-schema-objects/form-schema-objects';
import { articleRequestPost } from '../../services/realworld-blog-api/real-world-blog-api';
import { articleCurrentSet } from '../../redux/actions';

export const ArticleNew: React.FunctionComponent = () => {
  const currentUser = useTypedSelector((state) => state.currentUser as TUserCurrentIs);
  const { loading } = useTypedSelector((state) => state.status);
  const { articleAsync } = useActions();
  const navigate = useNavigate();

  const formData = useForm<IArticleNewForm>({
    mode: 'all',
    defaultValues: { tags: [{ name: '' }] },
    resolver: zodResolver(articleFormSchema),
  });
  const { control, setError } = formData;

  const fieldData = useFieldArray({
    control,
    name: 'tags',
  });

  const { token } = currentUser;

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
      articleAsync(articleRequestPost(article, token), articleCurrentSet, navigate);
    } else setError('root.tags', { message: 'You need to delete all duplicate tags for create article!' });
  };

  const content = loading ? (
    <Loader />
  ) : (
    <ArticleForm formData={formData} fieldData={fieldData} onSubmit={onSubmit} type="Create new" />
  );

  return content;
};
