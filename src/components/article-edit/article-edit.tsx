import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import { IArticleIs, IArticleNewForm, TUserCurrentIs } from '../../types/types';
import { Loader } from '../loader/loader';
import { ArticleForm } from '../article-form/article-form';
import { articleFormSchema } from '../../services/form-schema-objects';
import { articleRequestPut } from '../../services/real-world-blog-api';
import { articleCurrentSet } from '../../redux/actions';

type TArticleEditProps = {
  slug: string;
};

export const ArticleEdit: React.FunctionComponent<TArticleEditProps> = ({ slug }) => {
  const currentUser = useTypedSelector((state) => state.currentUser as TUserCurrentIs);
  const currentArticle = useTypedSelector((state) => state.currentArticle as IArticleIs);
  const { loading } = useTypedSelector((state) => state.status);
  const { articleAsync } = useActions();
  const navigate = useNavigate();

  const { title: curTitile, body: curBody, description: curDescription, tagList: curTags } = currentArticle;

  const formData = useForm<IArticleNewForm>({
    mode: 'all',
    defaultValues: {
      title: curTitile,
      body: curBody,
      description: curDescription,
      tags: curTags.map((tag) => ({
        name: tag,
      })),
    },
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
      articleAsync(articleRequestPut(article, token, slug), articleCurrentSet, navigate);
    } else setError('root.tags', { message: 'You need to delete all duplicate tags for edit article!' });
  };

  const content = loading ? (
    <Loader />
  ) : (
    <ArticleForm formData={formData} fieldData={fieldData} onSubmit={onSubmit} type="Edit" />
  );
  return content;
};
