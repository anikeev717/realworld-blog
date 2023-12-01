export interface IStatus {
  loading: boolean;
  error: boolean;
}

export enum EnumStatus {
  GET_STATUS_LOADING = 'GET_STATUS_LOADING',
  GET_STATUS_ERROR = 'GET_STATUS_ERROR',
  GET_STATUS_SUCCESS = 'GET_STATUS_SUCCESS',
}

export interface IStatusError {
  type: EnumStatus.GET_STATUS_ERROR;
}

export interface IStatusLoading {
  type: EnumStatus.GET_STATUS_LOADING;
}

export interface IStatusSuccess {
  type: EnumStatus.GET_STATUS_SUCCESS;
}

export type TStatusAction = IStatusError | IStatusLoading | IStatusSuccess;

export interface IArticles {
  articles: IArticleIs[] | [];
  articlesCount: number;
}
// export type TInitialArticle = Record<string, never>;

export interface IArticleIs {
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

export type TArticleCurrent = IArticleIs | null;

export interface IArticleNewForm {
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

export enum EnumArticles {
  SET_ARTICLES = 'SET_ARTICLES',
  CLEAR_ARTICLES = 'CLEAR_ARTICLES',
}

export interface IArticlesGet extends IArticles {
  type: EnumArticles.SET_ARTICLES;
}

export interface IArticlesClear {
  type: EnumArticles.CLEAR_ARTICLES;
}

export type TArticlesAction = IArticlesGet | IArticlesClear;

export enum EnumArticleIs {
  SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE',
  UNSET_CURRENT_ARTICLE = 'UNSET_CURRENT_ARTICLE',
}

export interface IArticleCurrentSet {
  type: EnumArticleIs.SET_CURRENT_ARTICLE;
  article: TArticleCurrent;
}

export interface IArticleCurrentUnset {
  type: EnumArticleIs.UNSET_CURRENT_ARTICLE;
}

export type TArticleCurrentAction = IArticleCurrentSet | IArticleCurrentUnset;

export enum EnumPage {
  SET_PAGE_NUMBER = 'SET_PAGE_NUMBER',
}

export interface IPageAction {
  type: EnumPage.SET_PAGE_NUMBER;
  page: number;
}

export interface IUserBase {
  username: string;
  email: string;
  token: string;
  image?: string;
  password?: string;
}

export type TUserCurrentIs = Omit<IUserBase, 'password'>;
export type TUserCurrent = TUserCurrentIs | null;

export type TUserRegister = Pick<IUserBase, 'username' | 'email' | 'password'>;

export interface IUserRegisterForm extends TUserRegister {
  agree: boolean;
  repass: string;
}

export type TUserLogin = Pick<IUserBase, 'email' | 'password'>;

export type TUserEdit = Omit<Partial<IUserBase>, 'token' | 'bio'>;

export interface IUser {
  user: TUserLogin | TUserRegister | TUserEdit;
}

export enum EnumUser {
  SET_LOGIN_USER = 'SET_LOGIN_USER;',
  SET_LOGOUT_USER = 'SET_LOGOUT_USER',
}

export interface IUserSetLogin {
  type: EnumUser.SET_LOGIN_USER;
  user: TUserCurrentIs;
}

export interface IUserSetLogout {
  type: EnumUser.SET_LOGOUT_USER;
}

export type IUserAction = IUserSetLogin | IUserSetLogout;

export interface IErrorsBase {
  username?: string;
  email?: string;
  password?: string;
  image?: string;
  'email or password'?: string;
}

export type TErrorRegister = Pick<IErrorsBase, 'username' | 'email'>;
export type TErrorLogin = Pick<IErrorsBase, 'email or password'>;
export type TErrorEdit = Omit<IErrorsBase, 'email or password'>;

export interface IErrors<Type> {
  errors: Type;
}

export enum EnumErrors {
  SET_ERRORS = 'SET_ERRORS',
  CLEAR_ERRORS = 'CLEAR_ERRORS',
}

export interface IErrorsSet {
  type: EnumErrors.SET_ERRORS;
  errors: IErrors<TErrorRegister | TErrorLogin | TErrorEdit>;
}

export interface IErrorsClear {
  type: EnumErrors.CLEAR_ERRORS;
}

export type IErrorsAction = IErrorsSet | IErrorsClear;
