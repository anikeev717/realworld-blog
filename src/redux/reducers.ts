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
  TArticlesAction,
  CurrentArticleEnum,
  TCurrentArticleAction,
  IArticle,
  IUserAction,
  UserEnum,
  IUserBase,
  IUserErrors,
  IUserErrorsAction,
  IUserErrorsEnum,
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
      return { loading: true, error: false };
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

export const setArticlesReducer = (state = initialArticles, action: TArticlesAction): IStateArticles => {
  switch (action.type) {
    case ArticlesEnum.GET_ARTICLES:
      return { articles: action.articles, articlesCount: action.articlesCount };

    case ArticlesEnum.CLEAR_ARTICLES:
      return initialArticles;

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

export const setCurrentArticle = (state = initialCurrentArticle, action: TCurrentArticleAction): IArticle | null => {
  switch (action.type) {
    case CurrentArticleEnum.SET_CURRENT_ARTICLE:
      return action.article;

    case CurrentArticleEnum.UNSET_CURRENT_ARTICLE:
      return null;

    default:
      return state;
  }
};

const initialPage: number = 1;

export const setPageReducer = (state = initialPage, action: IPageAction): number => {
  if (action.type === PageEnum.SET_PAGE_NUMBER) return action.page;

  return state;
};

export const setCurrentUser = (state = null, action: IUserAction): null | IUserBase => {
  switch (action.type) {
    case UserEnum.SET_LOGIN_USER:
      return action.user;
    case UserEnum.SET_LOGOUT_USER:
      return null;
    default:
      return state;
  }
};

export const setUserErrors = (state = null, action: IUserErrorsAction): null | IUserErrors => {
  switch (action.type) {
    case IUserErrorsEnum.GET_ERRORS:
      return action.errors;
    case IUserErrorsEnum.NO_ERRORS:
      return null;
    default:
      return state;
  }
};

export const reducer = combineReducers({
  status: setStatus,
  articlesInfo: setArticlesReducer,
  article: setCurrentArticle,
  page: setPageReducer,
  currentUser: setCurrentUser,
  currentUserErrors: setUserErrors,
});

export type RootState = ReturnType<typeof reducer>;
