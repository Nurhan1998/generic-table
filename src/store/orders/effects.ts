import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';

import requests from 'api/index';
import { ApiUrls } from 'api/apiUrls';

import { DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE } from 'components/Table/constants';

import { IOrderTableItem } from 'containers/OrdersList/types';

import { setTableData, setTableLoading, setTableTotalCount } from 'store/table/actions';
import { IListResponseModel, IPayloadAction } from 'store/types';
import { IFetchDataAction } from 'store/objects/types';

import { FETCH_ORDERS_LIST_REQUEST, fetchOrdersListFailure, fetchOrdersListSuccess } from './actions';

function* fetchData(action: IPayloadAction<IFetchDataAction>): Generator{
  const { page, pageSize, table } = action.payload;
  yield put(setTableLoading({ name: table, value: true }));
  const params = {
    page: page?.toString() || DEFAULT_FIRST_PAGE.toString(),
    pageSize: pageSize?.toString() || DEFAULT_PAGE_SIZE.toString()
  };
  try {
    const response = yield call(
      requests.get,
      // ApiUrls.ordersList,
      ApiUrls.objectsList,
      { params },
    );
    const { data } = response as AxiosResponse<IListResponseModel<IOrderTableItem>>;
    yield put(setTableData({ name: table, data: data.results }));
    yield put(setTableTotalCount({ name: table, value: data.count }));
    yield put(setTableLoading({ name: table, value: false }));
    yield put(fetchOrdersListSuccess(data));
  } catch (error) {
    yield put(fetchOrdersListFailure(error as AxiosError));
    yield put(setTableLoading({ name: table, value: false }));
  }
}

function* Saga(): Generator {
  yield all([
    takeLatest(FETCH_ORDERS_LIST_REQUEST, fetchData),
  ]);
}

export default Saga;
