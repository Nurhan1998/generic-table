import { all, put, takeLatest, delay, select, fork, cancel } from 'redux-saga/effects';
import { Task } from 'redux-saga';

import { DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE, FILTERS_FORM_NAME_POSTFIX } from 'components/Table/constants';
import { getSingleValue } from 'components/Select/utils';

import { IPayloadAction } from 'store/types';
import { makeSelectFormValuesAsFilterChips } from 'store/forms/selectors';
import { SET_FORM_VALUE } from 'store/forms/actions';
import { ISetFieldValueAction } from 'store/forms/types';

import {
  INIT_TABLE,
  SET_TABLE_PAGE,
  SET_TABLE_PAGE_SIZE,
  SET_TABLE_SEARCH,

  setTablePage,
} from './actions';
import {
  IFilterChip,
  IInitTableAction,
  ISetTableSearchAction,
  ITableNumericValueAction,
} from './types';
import {
  makeSelectTablePage,
  makeSelectTablePageSize,
  makeSelectTableFetchAction,
  makeSelectTableSearch,
  makeSelectTableSearchQueryKey,
} from './selectors';


const DELAY = 400;


function* _sendFetchRequest(fetchAction: string, table: string): Generator {
  yield delay(DELAY);
  const page = yield select(makeSelectTablePage(table));
  const pageSize = yield select(makeSelectTablePageSize(table));
  const filters = yield select(makeSelectFormValuesAsFilterChips(table));
  const search = yield select(makeSelectTableSearch(table));
  const searchQueryKey = yield select(makeSelectTableSearchQueryKey(table));

  const params: Record<string, string> = {
    page: (page as number | undefined)?.toString() || DEFAULT_FIRST_PAGE.toString(),
    pageSize: (pageSize as number | undefined)?.toString() || DEFAULT_PAGE_SIZE.toString()
  };

  for (const filter of (filters as Array<IFilterChip>)) {
    const value = getSingleValue(filter.value);
    if (!value) continue;
    params[filter.fieldName] = value;
  }

  if (search) {
    params[searchQueryKey as string] = search as string;
  }
  
  yield put({
    type: fetchAction,
    payload: {
      table,
      params,
    }
  });
}

let task: unknown | null = null;
function* sendFetchRequest(fetchAction: string, table: string): Generator {
  if (task) {
    yield cancel(task as Task);
    task = null;
  }
  task = yield fork(_sendFetchRequest, fetchAction, table);
}

function* initTable(action: IPayloadAction<IInitTableAction>): Generator {
  const { name, _meta: { fetchAction } } = action.payload;
  if (fetchAction) {
    yield* sendFetchRequest(fetchAction, name);
  }
}

function* pageChanged(action: IPayloadAction<ITableNumericValueAction>): Generator {
  const { name } = action.payload;
  const fetchAction = yield select(makeSelectTableFetchAction(name));
  if (fetchAction) {
    yield* sendFetchRequest(fetchAction as string, name);
  }
}

function* pageSizeChanged(action: IPayloadAction<ITableNumericValueAction>): Generator {
  const { name } = action.payload;
  const fetchAction = yield select(makeSelectTableFetchAction(name));
  if (fetchAction) {
    yield* sendFetchRequest(fetchAction as string, name);
  }
}

function* filterFormChanged(action: IPayloadAction<ISetFieldValueAction>): Generator {
  const { form } = action.payload;
  if (!form.endsWith(FILTERS_FORM_NAME_POSTFIX)) return;
  const tableName = form.replace(FILTERS_FORM_NAME_POSTFIX, '');
  yield put(setTablePage({ name: tableName, value: 1 }));
  const fetchAction = yield select(makeSelectTableFetchAction(tableName));
  if (fetchAction) {
    yield* sendFetchRequest(fetchAction as string, tableName);
  }
}

function* setTableSearch(action: IPayloadAction<ISetTableSearchAction>): Generator {
  const { name } = action.payload;
  yield put(setTablePage({ name, value: 1 }));
  const fetchAction = yield select(makeSelectTableFetchAction(name));
  if (fetchAction) {
    yield* sendFetchRequest(fetchAction as string, name);
  }
}

function* Saga(): Generator {
  yield all([
    takeLatest(INIT_TABLE, initTable),
    takeLatest(SET_TABLE_PAGE, pageChanged),
    takeLatest(SET_TABLE_PAGE_SIZE, pageSizeChanged),
    takeLatest(SET_FORM_VALUE, filterFormChanged),
    takeLatest(SET_TABLE_SEARCH, setTableSearch)
  ]);
}

export default Saga;
