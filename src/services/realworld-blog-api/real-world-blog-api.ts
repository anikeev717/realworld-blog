import { AxiosRequestConfig } from 'axios';

import { IArticleNew, IUser } from '../../types/types';

const apiUrlBase = 'https://blog.kata.academy/api';
const apiUrlArticles = `${apiUrlBase}/articles`;
const apiUrlUsers = `${apiUrlBase}/user`;

export const articlesAllRequestGet = (
  offset: number = 0,
  token: string | undefined = undefined,
  limit: number = 5
) => ({
  url: `${apiUrlArticles}?offset=${offset}&limit=${limit}`,
  headers: token ? { Authorization: `Token ${token}` } : {},
});

export const articleRequestGet = (slug: string, token: string | undefined = undefined): AxiosRequestConfig => ({
  url: `${apiUrlArticles}/${slug}`,
  headers: token ? { Authorization: `Token ${token}` } : {},
});

export const articleRequestPost = (data: IArticleNew, token: string): AxiosRequestConfig => ({
  method: 'POST',
  url: apiUrlArticles,
  data,
  headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
});

export const articleRequestPut = (data: IArticleNew, token: string, slug: string): AxiosRequestConfig => ({
  method: 'PUT',
  url: `${apiUrlArticles}/${slug}`,
  data,
  headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
});

export const articleRequestDelete = (token: string, slug: string): AxiosRequestConfig => ({
  method: 'DELETE',
  url: `${apiUrlArticles}/${slug}`,
  headers: { Authorization: `Token ${token}` },
});

export const articleRequestFavorite = (token: string, slug: string, favorited: boolean): AxiosRequestConfig => ({
  method: favorited ? 'DELETE' : 'POST',
  url: `https://blog.kata.academy/api/articles/${slug}/favorite`,
  headers: { Authorization: `Token ${token}` },
});

export const userRequestGet = (token: string) => ({
  url: apiUrlUsers,
  headers: { Authorization: `Token ${token}` },
});

export const userRequestPost = (data: IUser, login: '/login' | '' = '') => ({
  method: 'POST',
  url: `${apiUrlUsers}s${login}`,
  data,
  headers: { 'Content-Type': 'application/json' },
});

export const userRequestPut = (data: IUser, token: string) => ({
  method: 'PUT',
  url: apiUrlUsers,
  data,
  headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
});
