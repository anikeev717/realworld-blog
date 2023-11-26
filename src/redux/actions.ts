import axios, { AxiosError } from 'axios';
import { Dispatch } from 'react';

import {
  ArticlesEnum,
  IArticle,
  IPageAction,
  IStatusError,
  IStatusLoading,
  IStatusSuccess,
  PageEnum,
  StatusEnum,
  TStatusAction,
  CurrentArticleEnum,
  UserEnum,
  IUserRegister,
  IUserBase,
  IUserSetLogout,
  IUserAction,
  IUserLogin,
  IUserEdit,
  IUserSetLogin,
  IUserErrors,
  IUserErrorsAction,
  IUserErrorsEnum,
  IArticleNew,
  ISetCurrentArticle,
  IUnsetCurrentArticle,
  TCurrentArticleAction,
  IClearArticles,
  IGetArticles,
  TArticlesAction,
} from '../types/types';

export const errorStatus = (): IStatusError => ({
  type: StatusEnum.GET_STATUS_ERROR,
});

export const loadingStatus = (): IStatusLoading => ({
  type: StatusEnum.GET_STATUS_LOADING,
});

export const successStatus = (): IStatusSuccess => ({
  type: StatusEnum.GET_STATUS_SUCCESS,
});

export const setArticles = (articles: IArticle[], articlesCount: number): IGetArticles => ({
  type: ArticlesEnum.GET_ARTICLES,
  articles,
  articlesCount,
});

export const clearArticles = (): IClearArticles => ({
  type: ArticlesEnum.CLEAR_ARTICLES,
});

export const setCurrentArticle = (article: IArticle): ISetCurrentArticle => ({
  type: CurrentArticleEnum.SET_CURRENT_ARTICLE,
  article,
});

export const unSetCurrentArticle = (): IUnsetCurrentArticle => ({
  type: CurrentArticleEnum.UNSET_CURRENT_ARTICLE,
});

export const getArticles =
  (articlesOffset: number = 0, limit: number = 5, token: string | undefined = undefined) =>
  async (dispatch: Dispatch<TArticlesAction | TStatusAction>) => {
    dispatch(loadingStatus());
    try {
      const request = {
        method: 'GET',
        url: `https://blog.kata.academy/api/articles?offset=${articlesOffset}&limit=${limit}`,
      };
      if (token) Object.assign(request, { headers: { Authorization: `Token ${token}` } });
      const resp = await axios(request);
      const { articles, articlesCount } = resp.data;
      dispatch(successStatus());
      dispatch(setArticles(articles, articlesCount));
    } catch {
      dispatch(errorStatus());
    }
  };

export const favoriteArticle =
  (token: string, favorited: boolean, slug: string) =>
  async (dispatch: Dispatch<TArticlesAction | TCurrentArticleAction | TStatusAction>) => {
    dispatch(loadingStatus());
    try {
      const request = {
        url: `https://blog.kata.academy/api/articles/${slug}/favorite`,
        headers: { Authorization: `Token ${token}` },
      };
      Object.assign(request, favorited ? { method: 'DELETE' } : { method: 'POST' });
      const resp = await axios(request);
      const { article } = resp.data;
      dispatch(successStatus());
      dispatch(setCurrentArticle(article));
    } catch {
      dispatch(errorStatus());
    }
  };

export const getCurrentArticle =
  (slug: string) => async (dispatch: Dispatch<TCurrentArticleAction | TStatusAction>) => {
    dispatch(loadingStatus());
    try {
      const resp = await axios.get(`https://blog.kata.academy/api/articles/${slug}`);
      const { article } = resp.data;
      dispatch(successStatus());
      dispatch(setCurrentArticle(article));
    } catch {
      dispatch(errorStatus());
    }
  };

export const postCurrentArticle =
  (articleData: IArticleNew, addData: string, func: (argSlug: string) => void) =>
  async (dispatch: Dispatch<TCurrentArticleAction | TStatusAction>) => {
    dispatch(loadingStatus());
    try {
      const resp = await axios.post(`https://blog.kata.academy/api/articles`, articleData, {
        headers: { Authorization: `Token ${addData}` },
      });
      const { article } = resp.data;
      const { slug } = article as IArticle;
      func(`/articles/${slug}`);
      dispatch(successStatus());
      dispatch(setCurrentArticle(article));
    } catch {
      dispatch(errorStatus());
    }
  };

export const putCurrentArticle =
  (articleData: IArticleNew, addData: string, slugData: string, func: (argSlug: string) => void) =>
  async (dispatch: Dispatch<TCurrentArticleAction | TStatusAction>) => {
    dispatch(loadingStatus());
    try {
      const resp = await axios.put(`https://blog.kata.academy/api/articles/${slugData}`, articleData, {
        headers: { Authorization: `Token ${addData}` },
      });
      const { article } = resp.data;
      const { slug } = article as IArticle;
      func(`/articles/${slug}`);
      dispatch(successStatus());
      dispatch(setCurrentArticle(article));
    } catch {
      dispatch(errorStatus());
    }
  };

export const deleteCurrentArticle =
  (slug: string, addData: string) => async (dispatch: Dispatch<TCurrentArticleAction | TStatusAction>) => {
    dispatch(loadingStatus());
    try {
      const resp = await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
        headers: { Authorization: `Token ${addData}` },
      });
      if (resp.status === 204) {
        dispatch(successStatus());
        dispatch(unSetCurrentArticle());
      }
    } catch {
      dispatch(errorStatus());
    }
  };

export const setPage = (page: number): IPageAction => ({
  type: PageEnum.SET_PAGE_NUMBER,
  page,
});

export const userLogin = (user: IUserBase): IUserSetLogin => ({
  type: UserEnum.SET_LOGIN_USER,
  user,
});

export const userLogout = (): IUserSetLogout => ({
  type: UserEnum.SET_LOGOUT_USER,
});

export const userErrorsGet = (errors: IUserErrors): IUserErrorsAction => ({
  type: IUserErrorsEnum.GET_ERRORS,
  errors,
});

export const userErrorsNo = (): IUserErrorsAction => ({
  type: IUserErrorsEnum.NO_ERRORS,
});

export const getCurrentUser =
  (userData: IUserRegister | IUserLogin | IUserEdit, method: 'post' | 'put', addData: string = '') =>
  async (dispatch: Dispatch<IUserAction | IUserErrorsAction | TStatusAction>) => {
    dispatch(loadingStatus());
    dispatch(userErrorsNo());
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (method === 'put') Object.assign(headers, { Authorization: `Token ${addData}` });
      const resp = await axios({
        method,
        url: `https://blog.kata.academy/api/user${method === 'post' ? `s${addData}` : ''}`,
        data: userData,
        headers,
      });
      const { user } = resp.data;
      dispatch(successStatus());
      dispatch(userLogin(user));
      localStorage.setItem('userKey', JSON.stringify(user));
    } catch (error) {
      const err = error as AxiosError;
      const status: number | undefined = err.response?.status;
      const errors: unknown = err.response?.data;
      if (status !== 422) dispatch(errorStatus());
      else {
        dispatch(successStatus());
        dispatch(userErrorsGet(errors as IUserErrors));
      }
    }
  };
