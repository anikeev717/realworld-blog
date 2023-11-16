/* eslint-disable @typescript-eslint/default-param-last */
import { combineReducers } from 'redux';

import {
  ArticlesEnum,
  IStateArticles,
  IPageAction,
  PageEnum,
  StatusEnum,
  IStateStatus,
  TStatusAction,
  IArticlesAction,
  CurrentArticleEnum,
  ICurrentArticleAction,
  IArticle,
} from '../types/types';

const initialStatus: IStateStatus = {
  loading: false,
  error: false,
};

export const setStatus = (state = initialStatus, action: TStatusAction): IStateStatus => {
  switch (action.type) {
    case StatusEnum.GET_STATUS_ERROR:
      return { loading: false, error: true };
    case StatusEnum.GET_STATUS_LOADING:
      return { loading: true, error: true };
    case StatusEnum.GET_STATUS_SUCCESS:
      return { loading: false, error: false };

    default:
      return state;
  }
};

const initialArticles: IStateArticles = {
  articles: [],
  articlesCount: 0,
};

export const setArticlesReducer = (state = initialArticles, action: IArticlesAction): IStateArticles => {
  switch (action.type) {
    case ArticlesEnum.GET_ARTICLES:
      return { articles: action.articles, articlesCount: action.articlesCount };

    default:
      return state;
  }
};

// const initialCurrentArticle: IArticle = {
//   slug: '',
//   title: '',
//   description: '',
//   body: '',
//   createdAt: '',
//   updatedAt: '',
//   tagList: [],
//   favorited: false,
//   favoritesCount: 0,
//   author: {
//     username: '',
//     image: '',
//     following: false,
//   },
// }

const initialCurrentArticle = null;

export const setCurrentArticle = (state = initialCurrentArticle, action: ICurrentArticleAction): IArticle | null => {
  if (action.type === CurrentArticleEnum.GET_CURRENT_ARTICLE) return action.article;

  return state;
};

const initialPage: number = 1;

export const setPageReducer = (state = initialPage, action: IPageAction): number => {
  if (action.type === PageEnum.SET_PAGE_NUMBER) return action.page;

  return state;
};

export const reducer = combineReducers({
  status: setStatus,
  articlesInfo: setArticlesReducer,
  articleCurrent: setCurrentArticle,
  page: setPageReducer,
});

export type RootState = ReturnType<typeof reducer>;
