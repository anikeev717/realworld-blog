export interface IStateStatus {
  loading: boolean;
  error: boolean;
}

export enum StatusEnum {
  GET_STATUS_LOADING = 'GET_STATUS_LOADING',
  GET_STATUS_ERROR = 'GET_STATUS_ERROR',
  GET_STATUS_SUCCESS = 'GET_STATUS_SUCCESS',
}

export interface IStatusError {
  type: StatusEnum.GET_STATUS_ERROR;
}

export interface IStatusLoading {
  type: StatusEnum.GET_STATUS_LOADING;
}

export interface IStatusSuccess {
  type: StatusEnum.GET_STATUS_SUCCESS;
}

export type TStatusAction = IStatusError | IStatusLoading | IStatusSuccess;

export interface IStateArticles {
  articles: IArticle[];
  articlesCount: number;
}
export type TInitialArticle = Record<string, never>;

export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[] | [];
  favorited: boolean;
  favoritesCount: number;
  author: IAuthor;
}

export interface IAuthor {
  username: string;
  bio?: null;
  image: string;
  following: boolean;
}

export enum ArticlesEnum {
  GET_ARTICLES = 'GET_ARTICLES',
}

export interface IArticlesAction extends IStateArticles {
  type: ArticlesEnum.GET_ARTICLES;
}

export enum CurrentArticleEnum {
  GET_CURRENT_ARTICLE = 'GET_CURRENT_ARTICLE',
}

export interface ICurrentArticleAction {
  type: CurrentArticleEnum.GET_CURRENT_ARTICLE;
  article: IArticle;
}

export enum PageEnum {
  SET_PAGE_NUMBER = 'SET_PAGE_NUMBER',
}

export interface IPageAction {
  type: PageEnum.SET_PAGE_NUMBER;
  page: number;
}
