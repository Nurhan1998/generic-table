import createAction from 'utils/createAction';

import {
  IInitTableAction,
  ITableNameAction,
  ISetTableLoadingAction,
  ISetTableData,
  ITableNumericValueAction,
  ISetTableSearchAction,
} from './types';

const STATE_KEY = '@TABLE';

export const INIT_TABLE = `${STATE_KEY}_INIT_TABLE`;
export const REMOVE_TABLE = `${STATE_KEY}_REMOVE_TABLE`;
export const SET_TABLE_LOADING = `${STATE_KEY}_SET_TABLE_LOADING`;

export const SET_TABLE_DATA = `${STATE_KEY}_SET_TABLE_DATA`;
export const SET_TABLE_PAGE = `${STATE_KEY}_SET_TABLE_PAGE`;
export const SET_TABLE_PAGE_SIZE = `${STATE_KEY}_SET_TABLE_PAGE_SIZE`;
export const SET_TABLE_TOTAL_COUNT = `${STATE_KEY}_SET_TABLE_TOTAL_COUNT`;
export const SET_TABLE_SEARCH = `${STATE_KEY}_SET_TABLE_SEARCH`;


export const initTable = createAction<IInitTableAction>(INIT_TABLE);
export const removeTable = createAction<ITableNameAction>(REMOVE_TABLE);
export const setTableLoading = createAction<ISetTableLoadingAction>(SET_TABLE_LOADING);

export const setTableData = createAction<ISetTableData>(SET_TABLE_DATA);
export const setTablePage = createAction<ITableNumericValueAction>(SET_TABLE_PAGE);
export const setTablePageSize = createAction<ITableNumericValueAction>(SET_TABLE_PAGE_SIZE);
export const setTableTotalCount = createAction<ITableNumericValueAction>(SET_TABLE_TOTAL_COUNT);
export const setTableSearch = createAction<ISetTableSearchAction>(SET_TABLE_SEARCH);
