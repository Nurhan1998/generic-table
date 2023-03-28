import { RecordOf } from 'immutable';

import { IObjectTableItem } from 'containers/ObjectsList/types';

import { THandler, TSelectorReturnType } from 'store/types';

export interface IObjectDetailState {
  loading: boolean;
  detail?: IObjectTableItem;
}

export type TObjectDetailStoreRecord = RecordOf<IObjectDetailState>;
export type TObjectDetailHandler<T = void> = THandler<TObjectDetailStoreRecord, T>;
export type TObjectDetailReturnType<T> = TSelectorReturnType<T, TObjectDetailStoreRecord>;

