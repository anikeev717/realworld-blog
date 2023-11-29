/* eslint-disable @typescript-eslint/default-param-last */
import { combineReducers } from 'redux';

import {
  EnumArticleIs,
  EnumArticles,
  EnumErrors,
  EnumPage,
  EnumStatus,
  EnumUser,
  IArticles,
  IErrors,
  IErrorsAction,
  IPageAction,
  IStatus,
  IUserAction,
  TArticleCurrent,
  TArticleCurrentAction,
  TArticlesAction,
  TErrorEdit,
  TErrorLogin,
  TErrorRegister,
  TStatusAction,
  TUserCurrent,
} from '../types/types';

const initialStatus: IStatus = {
  loading: false,
  error: false,
};

export const setStatus = (state = initialStatus, action: TStatusAction): IStatus => {
  switch (action.type) {
    case EnumStatus.GET_STATUS_ERROR:
      return { loading: false, error: true };
    case EnumStatus.GET_STATUS_LOADING:
      return { loading: true, error: false };
    case EnumStatus.GET_STATUS_SUCCESS:
      return { loading: false, error: false };

    default:
      return state;
  }
};

const initialArticles: IArticles = {
  articles: [],
  articlesCount: 0,
};

export const setArticlesReducer = (state = initialArticles, action: TArticlesAction): IArticles => {
  switch (action.type) {
    case EnumArticles.SET_ARTICLES:
      return { articles: action.articles, articlesCount: action.articlesCount };

    case EnumArticles.CLEAR_ARTICLES:
      return initialArticles;

    default:
      return state;
  }
};

const initialCurrentArticle = null;

export const setCurrentArticle = (state = initialCurrentArticle, action: TArticleCurrentAction): TArticleCurrent => {
  switch (action.type) {
    case EnumArticleIs.SET_CURRENT_ARTICLE:
      return action.article;

    case EnumArticleIs.UNSET_CURRENT_ARTICLE:
      return null;

    default:
      return state;
  }
};

const initialPage: number = 1;

export const setPageReducer = (state = initialPage, action: IPageAction): number => {
  if (action.type === EnumPage.SET_PAGE_NUMBER) return action.page;

  return state;
};

export const setCurrentUser = (state = null, action: IUserAction): TUserCurrent => {
  switch (action.type) {
    case EnumUser.SET_LOGIN_USER:
      return action.user;
    case EnumUser.SET_LOGOUT_USER:
      return null;
    default:
      return state;
  }
};

export const setErrors = (
  state = null,
  action: IErrorsAction
): null | IErrors<TErrorRegister | TErrorLogin | TErrorEdit> => {
  switch (action.type) {
    case EnumErrors.SET_ERRORS:
      return action.errors;
    case EnumErrors.CLEAR_ERRORS:
      return null;
    default:
      return state;
  }
};

export const reducer = combineReducers({
  status: setStatus,
  page: setPageReducer,
  articlesInfo: setArticlesReducer,
  currentArticle: setCurrentArticle,
  currentUser: setCurrentUser,
  currentErrors: setErrors,
});

export type RootState = ReturnType<typeof reducer>;
