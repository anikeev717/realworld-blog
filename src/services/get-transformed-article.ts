import { IArticleIs } from '../types/types';

import { isUndefined } from './is-undefined';

export const getTransformedArticle = (article: IArticleIs) => ({
  ...article,
  title: isUndefined(article.title, article.slug, 128),
  description: isUndefined(article.description, `Description for this article is not present!`, 256),
  body: isUndefined(article.body, `Text for this article is not present!`, 4096),
  tagList: article.tagList.slice(0, 5).map((tag) => isUndefined(tag, 'Empty tag', 128)),
  author: {
    ...article.author,
    username: isUndefined(article.author.username, `${article.slug}-author`, 20),
  },
});
