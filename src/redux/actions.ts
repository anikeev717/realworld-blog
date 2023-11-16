import axios from 'axios';
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
  IArticlesAction,
  TStatusAction,
  ICurrentArticleAction,
  CurrentArticleEnum,
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

export const setArticles = (articles: IArticle[], articlesCount: number): IArticlesAction => ({
  type: ArticlesEnum.GET_ARTICLES,
  articles,
  articlesCount,
});

export const setCurrentArticle = (article: IArticle): ICurrentArticleAction => ({
  type: CurrentArticleEnum.GET_CURRENT_ARTICLE,
  article,
});

export const getArticles =
  (articlesOffset: number = 0, limit: number = 5) =>
  async (dispatch: Dispatch<IArticlesAction | TStatusAction>) => {
    dispatch(loadingStatus());
    try {
      const resp = await axios.get(`https://blog.kata.academy/api/articles?offset=${articlesOffset}&limit=${limit}`);
      const { articles, articlesCount } = resp.data;
      dispatch(successStatus());
      dispatch(setArticles(articles, articlesCount));
    } catch {
      dispatch(errorStatus());
    }
  };

export const getCurrentArticle =
  (slug: string) => async (dispatch: Dispatch<ICurrentArticleAction | TStatusAction>) => {
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

export const setPage = (page: number): IPageAction => ({
  type: PageEnum.SET_PAGE_NUMBER,
  page,
});
