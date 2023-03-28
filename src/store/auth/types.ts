import { RecordOf } from 'immutable';

import { ResponseGenericType, THandler, TSelectorReturnType } from 'store/types';

export interface ITokenState {
    refresh: string;
    access: string;
}

export interface IProfile {
  email: string;
  date_joined: string;
  first_name: string;
  last_name: string;
  group: string;
  permissions: Array<string>;
  phone?: string;
  position?: string;
  avatar?: string;
}

export interface IAuthStore {
    token: ITokenState | null;

    signIn: ResponseGenericType<ITokenState>;
    profile: ResponseGenericType<IProfile>
}

export type TAuthRequest = {
    email: string;
    password: string;
}

export type TAuthStoreRecord = RecordOf<IAuthStore>;

export type TAuthHandler<T = void> = THandler<TAuthStoreRecord, T>;
export type TAuthSelectorReturnType<T> = TSelectorReturnType<T, TAuthStoreRecord>;

export interface IPermission {
  appName: string;
  modelName: string;
}

export enum EPermissionAction {
  ADD = 'add',
  VIEW = 'view',
  EDIT = 'change',
  DELETE = 'delete',
}
