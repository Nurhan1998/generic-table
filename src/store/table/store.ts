import { fromJS } from 'immutable';

import { DEFAULT_PAGE_SIZE, DEFAULT_FIRST_PAGE } from 'components/Table/constants';

import createReducer from 'utils/createReducer';

import {
  TTableState,
  TTableHandler,
  IInitTableAction,
  ITableNameAction,
  ISetTableLoadingAction,
  ITableState,
  ISetTableData,
  ITableNumericValueAction, ISetTableSearchAction,
} from './types';
import {
  INIT_TABLE,
  REMOVE_TABLE,
  SET_TABLE_LOADING,
  SET_TABLE_DATA,
  SET_TABLE_TOTAL_COUNT,
  SET_TABLE_PAGE_SIZE,
  SET_TABLE_PAGE,
  SET_TABLE_SEARCH,
} from './actions';

const initialState: TTableState = fromJS({});


const initTable: TTableHandler<IInitTableAction> = (state, action) => {
  const { name, _meta, pagination = {} } = action.payload;
  if (state.has(name)) return state;
  const _state: ITableState = {
    _META: {
      ..._meta,
      loading: true,
    },
    data: [],
    pagination: {
      page: DEFAULT_FIRST_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
      totalCount: 0,
      ...pagination,
    },
    search: '',
  };
  return state.set(name, fromJS(_state));
};

const removeTable: TTableHandler<ITableNameAction> = (state, action) => {
  const { name } = action.payload;
  if (!state.has(name)) return state;
  return state.remove(name);
};

const setTableLoading: TTableHandler<ISetTableLoadingAction> = (state, action) => {
  const { name, value } = action.payload;
  if (!state.has(name)) return state;
  return state.setIn([name, '_META', 'loading'], value);
};

const setTableData: TTableHandler<ISetTableData> = (state, action) => {
  const { name, data } = action.payload;
  if (!state.has(name)) return state;
  return state.setIn([name, 'data'], fromJS(data));
};

const setTableTotalCount: TTableHandler<ITableNumericValueAction> = (state, action) => {
  const { name, value } = action.payload;
  if (!state.has(name)) return state;
  return state.setIn([name, 'pagination', 'totalCount'], value);
};

const setTablePage: TTableHandler<ITableNumericValueAction> = (state, action) => {
  const { name, value } = action.payload;
  if (!state.has(name)) return state;
  return state.setIn([name, 'pagination', 'page'], value > 0 ? value : DEFAULT_FIRST_PAGE);
};

const setTablePageSize: TTableHandler<ITableNumericValueAction> = (state, action) => {
  const { name, value } = action.payload;
  if (!state.has(name)) return state;
  return state.setIn([name, 'pagination', 'pageSize'], value);
};

const setTableSearch: TTableHandler<ISetTableSearchAction> = (state, action) => {
  const { name, value } = action.payload;
  if (!state.has(name)) return state;
  return state.setIn([name, 'search'], value);
};

export default createReducer<TTableState>(initialState, {
  [INIT_TABLE]: initTable,
  [REMOVE_TABLE]: removeTable,
  [SET_TABLE_LOADING]: setTableLoading,
  [SET_TABLE_DATA]: setTableData,
  [SET_TABLE_TOTAL_COUNT]: setTableTotalCount,
  [SET_TABLE_PAGE]: setTablePage,
  [SET_TABLE_PAGE_SIZE]: setTablePageSize,
  [SET_TABLE_SEARCH]: setTableSearch,
});
