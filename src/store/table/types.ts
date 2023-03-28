import { RecordOf } from 'immutable';

import { IConfig } from 'components/Form/types';

import { THandler, TSelectorReturnType } from 'store/types';

export interface ITableItem {
  id: string;
}
export interface IFilterChip {
  displayName: string;
  displayValue: string;
  fieldName: string;
  value: string;
}
export interface ITableMeta {
  searchQueryKey?: string;
  filterConfig?: Array<IConfig>;
  loading?: boolean;
  fetchAction?: string;
}
export interface ITablePagination {
  page: number;
  totalCount?: number;
  pageSize?: number;
}
export interface ITableState<T extends ITableItem = ITableItem> {
  _META: ITableMeta;
  data: Array<T>;
  pagination: ITablePagination;
  search: string;
}

export type TRecordOfTableState = RecordOf<ITableState>;
export type TTableState = RecordOf<Record<string, TRecordOfTableState>>;
export type TTableHandler<T> = THandler<TTableState, T>;
export type TTableSelectorReturnType<T> = TSelectorReturnType<T, TTableState>;


export interface ITableNameAction {
  name: string;
}

export interface IInitTableAction extends ITableNameAction {
  _meta: ITableMeta;
  pagination?: ITablePagination;
}

export interface ISetTableLoadingAction extends ITableNameAction {
  value: boolean;
}

export interface ISetTableData<T extends ITableItem = ITableItem> extends ITableNameAction {
  data: Array<T>
}

export interface ITableNumericValueAction extends ITableNameAction {
  value: number;
}

export interface ISetTableSearchAction extends ITableNameAction {
  value: string;
}

export interface IFetchDataAction {
  table: string;
  params?: Record<string, string>;
}
