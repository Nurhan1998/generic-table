import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

import { DEFAULT_PAGE_SIZE, DEFAULT_SEARCH_QUERY_KEY } from 'components/Table/constants';

import { IAppState } from 'store/types';

import safeGet from 'utils/safeGet';

import { TTableSelectorReturnType, TTableState, ITableItem } from './types';


const selectState = (state: IAppState): TTableState =>
  safeGet<IAppState, TTableState>(state, 'table', fromJS({}));

export const makeSelectTableLoading = (table: string): TTableSelectorReturnType<boolean> =>
  createSelector(
    selectState,
    (state: TTableState) => {
      const value = state.getIn([table, '_META', 'loading']);
      if (typeof value !== 'boolean') return false;
      return value;
    },
  );

export const makeSelectTableData = <T extends ITableItem>(table: string): TTableSelectorReturnType<Array<T>> =>
  createSelector(
    selectState,
    (state: TTableState) => {
      const data = state.getIn([table, 'data']);
      if (!data) return [] as Array<T>;
      return data.toJS() as Array<T>;
    },
  );

export const makeSelectTablePage = (table: string): TTableSelectorReturnType<number> =>
  createSelector(
    selectState,
    (state: TTableState) => {
      const value = state.getIn([table, 'pagination', 'page']);
      if (typeof value !== 'number') return 1;
      return value;
    }
  );

export const makeSelectTablePageSize = (table: string): TTableSelectorReturnType<number> =>
  createSelector(
    selectState,
    (state: TTableState) => {
      const value = state.getIn([table, 'pagination', 'pageSize']);
      if (typeof value !== 'number') return DEFAULT_PAGE_SIZE;
      return value;
    }
  );

export const makeSelectTableTotalCount = (table: string): TTableSelectorReturnType<number> =>
  createSelector(
    selectState,
    (state: TTableState) => {
      const value = state.getIn([table, 'pagination', 'totalCount']);
      if (typeof value !== 'number') return 0;
      return value;
    }
  );


export const makeSelectTableFetchAction = (table: string): TTableSelectorReturnType<string | undefined> =>
  createSelector(
    selectState,
    (state: TTableState) => state.getIn([table, '_META', 'fetchAction'])
  );

export const makeSelectTableSearch = (table: string): TTableSelectorReturnType<string> =>
  createSelector(
    selectState,
    (state: TTableState) => {
      const value: string | undefined = state.getIn([table, 'search']);
      if (!value) return '';
      return value;
    }
  );

export const makeSelectTableSearchQueryKey = (table: string): TTableSelectorReturnType<string> =>
  createSelector(
    selectState,
    (state: TTableState) => {
      const value: string | undefined = state.getIn([table, '_META', 'searchQueryKey']);
      if (!value) return DEFAULT_SEARCH_QUERY_KEY;
      return value;
    },
  );
