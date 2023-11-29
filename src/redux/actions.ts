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
  // IArticleCurrentUnset,
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
  IUserBase,
  IUserSetLogin,
  IUserSetLogout,
  TArticleCurrent,
  TArticleCurrentAction,
  TArticlesAction,
  TErrorEdit,
  TErrorLogin,
  TErrorRegister,
  TStatusAction,
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

// export const articleCurrentUnset = (): IArticleCurrentUnset => ({
//   type: EnumArticleIs.UNSET_CURRENT_ARTICLE,
// });

// export const articlesGet =
//   (articlesOffset: number = 0, limit: number = 5, token: string | undefined = undefined) =>
//   async (dispatch: Dispatch<TArticlesAction | TStatusAction>) => {
//     dispatch(statusLoading());
//     try {
//       const request = {
//         method: 'GET',
//         url: `https://blog.kata.academy/api/articles?offset=${articlesOffset}&limit=${limit}`,
//       };
//       if (token) Object.assign(request, { headers: { Authorization: `Token ${token}` } });
//       const resp = await axios(request);
//       const { articles, articlesCount } = resp.data;
//       dispatch(statusSuccess());
//       dispatch(articlesSet({ articles, articlesCount }));
//     } catch {
//       dispatch(statusError());
//     }
//   };

// export const favoriteArticle =
//   (token: string, favorited: boolean, slug: string) =>
//   async (dispatch: Dispatch<TArticlesAction | TArticleCurrentAction | TStatusAction>) => {
//     dispatch(statusLoading());
//     try {
//       const request = {
//         url: `https://blog.kata.academy/api/articles/${slug}/favorite`,
//         headers: { Authorization: `Token ${token}` },
//       };
//       Object.assign(request, favorited ? { method: 'DELETE' } : { method: 'POST' });
//       const resp = await axios(request);
//       const { article } = resp.data;
//       dispatch(statusSuccess());
//       dispatch(articleCurrentSet(article));
//     } catch {
//       dispatch(statusError());
//     }
//   };

// export const getCurrentArticle =
//   (slug: string) => async (dispatch: Dispatch<TArticleCurrentAction | TStatusAction>) => {
//     dispatch(statusLoading());
//     try {
//       const resp = await axios.get(`https://blog.kata.academy/api/articles/${slug}`);
//       const { article } = resp.data;
//       dispatch(statusSuccess());
//       dispatch(articleCurrentSet(article));
//     } catch {
//       dispatch(statusError());
//     }
//   };

// export const postCurrentArticle =
//   (articleData: IArticleNew, addData: string, func: (argSlug: string) => void) =>
//   async (dispatch: Dispatch<TArticleCurrentAction | TStatusAction>) => {
//     dispatch(statusLoading());
//     try {
//       const resp = await axios.post(`https://blog.kata.academy/api/articles`, articleData, {
//         headers: { Authorization: `Token ${addData}` },
//       });
//       const { article } = resp.data;
//       const { slug } = article as IArticleIs;
//       func(`/articles/${slug}`);
//       dispatch(statusSuccess());
//       dispatch(articleCurrentSet(article));
//     } catch {
//       dispatch(statusError());
//     }
//   };

// export const putCurrentArticle =
//   (articleData: IArticleNew, addData: string, slugData: string, func: (argSlug: string) => void) =>
//   async (dispatch: Dispatch<TArticleCurrentAction | TStatusAction>) => {
//     dispatch(statusLoading());
//     try {
//       const resp = await axios.put(`https://blog.kata.academy/api/articles/${slugData}`, articleData, {
//         headers: { Authorization: `Token ${addData}` },
//       });
//       const { article } = resp.data;
//       const { slug } = article as IArticleIs;
//       func(`/articles/${slug}`);
//       dispatch(statusSuccess());
//       dispatch(articleCurrentSet(article));
//     } catch {
//       dispatch(statusError());
//     }
//   };

// export const deleteCurrentArticle =
//   (slug: string, addData: string) => async (dispatch: Dispatch<TArticleCurrentAction | TStatusAction>) => {
//     dispatch(statusLoading());
//     try {
//       const resp = await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
//         headers: { Authorization: `Token ${addData}` },
//       });
//       if (resp.status === 204) {
//         dispatch(statusSuccess());
//         dispatch(articleCurrentUnset());
//       }
//     } catch {
//       dispatch(statusError());
//     }
//   };

export const pageSet = (page: number): IPageAction => ({
  type: EnumPage.SET_PAGE_NUMBER,
  page,
});

export const userSetLogin = (user: IUserBase): IUserSetLogin => ({
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

// export const getCurrentUser =
//   (userData: IUser, method: 'post' | 'put', addData: string = '') =>
//   async (dispatch: Dispatch<IUserAction | IErrorsAction | TStatusAction>) => {
//     dispatch(statusLoading());
//     dispatch(errorsClear());
//     try {
//       const headers = { 'Content-Type': 'application/json' };
//       if (method === 'put') Object.assign(headers, { Authorization: `Token ${addData}` });
//       const resp = await axios({
//         method,
//         url: `https://blog.kata.academy/api/user${method === 'post' ? `s${addData}` : ''}`,
//         data: userData,
//         headers,
//       });
//       const { user } = resp.data;
//       dispatch(statusSuccess());
//       dispatch(userSetLogin(user));
//       localStorage.setItem('userKey', JSON.stringify(user));
//     } catch (error) {
//       const err = error as AxiosError;
//       const status: number | undefined = err.response?.status;
//       const errors: unknown = err.response?.data;
//       if (status !== 422) dispatch(statusError());
//       else {
//         dispatch(statusSuccess());
//         dispatch(errorsSet(errors as IErrors<TErrorRegister | TErrorLogin | TErrorEdit>));
//       }
//     }
//   };

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
      // console.log(resp.data);
      // const article: TArticleCurrent = resp.data?.article || null;
      // console.log(article);
      // dispatch(func(article));
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
      const { user } = resp.data;
      dispatch(statusSuccess());
      dispatch(userSetLogin(user));
      localStorage.setItem('userKey', JSON.stringify(user));
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
