import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Dispatch } from 'react';

import {
  EnumArticleIs,
  EnumArticles,
  EnumErrors,
  EnumPage,
  EnumStatus,
  EnumUser,
  IArticleCurrentSet,
  IArticleIs,
  IArticlesClear,
  IArticlesGet,
  IErrors,
  IErrorsAction,
  IPageAction,
  IStatusError,
  IStatusLoading,
  IStatusSuccess,
  IUserAction,
  IUserSetLogin,
  IUserSetLogout,
  TArticleCurrent,
  TArticleCurrentAction,
  TArticlesAction,
  TErrorEdit,
  TErrorLogin,
  TErrorRegister,
  TStatusAction,
  TUserCurrentIs,
} from '../types/types';

export const statusError = (): IStatusError => ({
  type: EnumStatus.GET_STATUS_ERROR,
});

export const statusLoading = (): IStatusLoading => ({
  type: EnumStatus.GET_STATUS_LOADING,
});

export const statusSuccess = (): IStatusSuccess => ({
  type: EnumStatus.GET_STATUS_SUCCESS,
});

export const articlesSet = (data: { articles: IArticleIs[]; articlesCount: number }): IArticlesGet => ({
  type: EnumArticles.SET_ARTICLES,
  articles: data.articles,
  articlesCount: data.articlesCount,
});

export const articlesClear = (): IArticlesClear => ({
  type: EnumArticles.CLEAR_ARTICLES,
});

export const articleCurrentSet = (data: { article?: TArticleCurrent }): IArticleCurrentSet => ({
  type: EnumArticleIs.SET_CURRENT_ARTICLE,
  article: data.article || null,
});

export const pageSet = (page: number): IPageAction => ({
  type: EnumPage.SET_PAGE_NUMBER,
  page,
});

export const userSetLogin = (user: TUserCurrentIs): IUserSetLogin => ({
  type: EnumUser.SET_LOGIN_USER,
  user,
});

export const userSetLogout = (): IUserSetLogout => ({
  type: EnumUser.SET_LOGOUT_USER,
});

export const errorsSet = (errors: IErrors<TErrorRegister | TErrorLogin | TErrorEdit>): IErrorsAction => ({
  type: EnumErrors.SET_ERRORS,
  errors,
});

export const errorsClear = (): IErrorsAction => ({
  type: EnumErrors.CLEAR_ERRORS,
});

type TNavigateFunction = (slug: string) => void | undefined;

export const articleAsync =
  (
    requestConfig: AxiosRequestConfig,
    func: typeof articleCurrentSet | typeof articlesSet,
    navigate?: TNavigateFunction
  ) =>
  async (dispatch: Dispatch<TArticleCurrentAction | TArticlesAction | TStatusAction>) => {
    dispatch(statusLoading());
    try {
      const resp = await axios(requestConfig);
      dispatch(func(resp.data));
      dispatch(statusSuccess());
      if (navigate) {
        const article: TArticleCurrent = resp.data?.article || null;
        const navigateLink = article?.slug ? `/articles/${article?.slug}` : '/';
        navigate(navigateLink);
      }
    } catch {
      dispatch(statusError());
    }
  };

export const userAsync =
  (requestConfig: AxiosRequestConfig) => async (dispatch: Dispatch<IUserAction | IErrorsAction | TStatusAction>) => {
    dispatch(statusLoading());
    dispatch(errorsClear());
    try {
      const resp = await axios(requestConfig);
      const { user }: { user: TUserCurrentIs } = resp.data;
      dispatch(statusSuccess());
      dispatch(userSetLogin(user));
      const { token } = user;
      localStorage.setItem('user', token);
    } catch (error) {
      const err = error as AxiosError;
      const status: number | undefined = err.response?.status;
      const errors: unknown = err.response?.data;
      if (status !== 422) dispatch(statusError());
      else {
        dispatch(statusSuccess());
        dispatch(errorsSet(errors as IErrors<TErrorRegister | TErrorLogin | TErrorEdit>));
      }
    }
  };
