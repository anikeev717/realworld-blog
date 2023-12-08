import { isUndefined } from '../services/is-undefined';
import { IArticleIs } from '../types/types';

import { useDateString } from './use-date-string';
import { useImage } from './use-image';

export const useTransform = (article: IArticleIs) => ({
  ...article,
  title: isUndefined(article.title, article.slug, 128),
  description: isUndefined(article.description, `Description for this article is not present!`, 256),
  body: isUndefined(article.body, `Text for this article is not present!`, 4096),
  tagList: article.tagList.slice(0, 5).map((tag) => isUndefined(tag, 'Empty tag', 128)),
  createdAt: useDateString(article.createdAt),
  author: {
    username: isUndefined(article.author.username, `${article.slug}-author`, 20),
    image: useImage(article.author.image),
  },
});
