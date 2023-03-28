import { RecordOf } from 'immutable';

import { IObjectTableItem } from 'containers/ObjectsList/types';

import { ResponseGenericType, THandler, TSelectorReturnType } from 'store/types';

export interface IFetchSingleDataAction {
  uuid: string;
}

export interface ISearchObjectsAction {
  params: Record<string, string>;
}

export interface IObjectDetailState {
  items?: ResponseGenericType<IObjectTableItem[]>;
  detail?: ResponseGenericType<IObjectTableItem>;
  history?: IObjectTableItem[];
}

export type TObjectDetailStoreRecord = RecordOf<IObjectDetailState>;
export type TObjectDetailHandler<T = void> = THandler<TObjectDetailStoreRecord, T>;
export type TObjectDetailReturnType<T> = TSelectorReturnType<T, TObjectDetailStoreRecord>;
export type IFetchDataAction = {
  page: number, pageSize: number, table: string
}
