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

export interface IArticleBaseNew {
  tags: { name: string }[];
  title: string;
  description: string;
  body: string;
}

export interface IArticleNew {
  article: {
    tagList: string[];
    title: string;
    description: string;
    body: string;
  };
}

export interface IAuthor {
  username: string;
  bio?: null;
  image: string;
  following: boolean;
}

export enum ArticlesEnum {
  GET_ARTICLES = 'GET_ARTICLES',
  CLEAR_ARTICLES = 'CLEAR_ARTICLES',
}

export interface IGetArticles extends IStateArticles {
  type: ArticlesEnum.GET_ARTICLES;
}

export interface IClearArticles {
  type: ArticlesEnum.CLEAR_ARTICLES;
}

export type TArticlesAction = IGetArticles | IClearArticles;

export enum CurrentArticleEnum {
  SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE',
  UNSET_CURRENT_ARTICLE = 'UNSET_CURRENT_ARTICLE',
}

export interface ISetCurrentArticle {
  type: CurrentArticleEnum.SET_CURRENT_ARTICLE;
  article: IArticle;
}

export interface IUnsetCurrentArticle {
  type: CurrentArticleEnum.UNSET_CURRENT_ARTICLE;
}

export type TCurrentArticleAction = ISetCurrentArticle | IUnsetCurrentArticle;

export enum PageEnum {
  SET_PAGE_NUMBER = 'SET_PAGE_NUMBER',
}

export interface IPageAction {
  type: PageEnum.SET_PAGE_NUMBER;
  page: number;
}

export interface IUserBase {
  username: string;
  email: string;
  token: string;
  bio?: string;
  image: string;
  password: string;
}

export type IUserBaseEdit = Omit<Partial<IUserBase>, 'token' | 'bio'>;

export interface IUserRegister {
  user: Pick<IUserBase, 'username' | 'email' | 'password'>;
}

export interface IUserEdit {
  user: IUserBaseEdit;
}

export interface IUserLogin {
  user: Pick<IUserBase, 'email' | 'password'>;
}

export enum UserEnum {
  SET_LOGIN_USER = 'SET_LOGIN_USER;',
  SET_LOGOUT_USER = 'SET_LOGOUT_USER',
}

export interface IUserSetLogin {
  type: UserEnum.SET_LOGIN_USER;
  user: IUserBase;
}

export interface IUserSetLogout {
  type: UserEnum.SET_LOGOUT_USER;
}

export type IUserAction = IUserSetLogin | IUserSetLogout;

export interface IUserErrorsBase {
  username?: string;
  email?: string;
  'email or password'?: string;
}

export interface IUserErrors {
  errors: IUserErrorsBase;
}

export enum IUserErrorsEnum {
  GET_ERRORS = 'GET_ERRORS',
  NO_ERRORS = 'NO_ERRORS',
}

export interface IUserGetErrors {
  type: IUserErrorsEnum.GET_ERRORS;
  errors: IUserErrors;
}

export interface IUserNoErrors {
  type: IUserErrorsEnum.NO_ERRORS;
}

export type IUserErrorsAction = IUserGetErrors | IUserNoErrors;
