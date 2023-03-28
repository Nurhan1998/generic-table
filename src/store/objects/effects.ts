import { all, takeLatest, put, call } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios';

import requests from 'api/index';
import { ApiUrls } from 'api/apiUrls';

import { IObjectTableItem } from 'containers/ObjectsList/types';

import { IPayloadAction, IListResponseModel } from 'store/types';
import { setTableData, setTableLoading, setTableTotalCount } from 'store/table/actions';
import { IFetchDataAction } from 'store/table/types';

import {
  IFetchSingleDataAction, ISearchObjectsAction,
} from './types';
import {
  FETCH_DATA_REQUEST,
  fetchDataSuccess,
  fetchDataFailure,
  FETCH_SINGLE_DATA_REQUEST,
  setObjectDetailLoading,
  fetchSingleDataSuccess,
  fetchSingleDataFailure,
  setSearchObjectsLoading, fetchSearchObjectsFailure, fetchSearchObjectsSuccess, FETCH_SEARCH_OBJECTS_REQUEST,
} from './actions';


function* fetchData(action: IPayloadAction<IFetchDataAction>): Generator {
  const { table, params } = action.payload;
  yield put(setTableLoading({ name: table, value: true }));

  try {
    const response = yield call(
      requests.get,
      ApiUrls.objectsList,
      { params },
    );
    const { data } = response as AxiosResponse<IListResponseModel<IObjectTableItem>>;
    yield put(setTableData({ name: table, data: data.results }));
    yield put(setTableTotalCount({ name: table, value: data.count }));
    yield put(setTableLoading({ name: table, value: false }));
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error as AxiosError));
    yield put(setTableLoading({ name: table, value: false }));
  }
}

function* fetchSingleData(action: IPayloadAction<IFetchSingleDataAction>) {
  yield put(setObjectDetailLoading(true));
  try{
    const response: AxiosResponse<IObjectTableItem> = yield call(
      requests.get,
      `${ApiUrls.objectsList}${action.payload.uuid}/`,
    );

    const { data } = response;

    yield put(setObjectDetailLoading(false));
    yield put(fetchSingleDataSuccess(data));

  } catch (error) {
    yield put(fetchSingleDataFailure(error as AxiosError));
    yield put(setObjectDetailLoading(false));
  }
}

function* fetchSearchedObjects(action: IPayloadAction<ISearchObjectsAction>){
  yield put(setSearchObjectsLoading(true));
  const { params } = action.payload;
  try {
    const response: AxiosResponse<IObjectTableItem[]> = yield call(
      requests.get,
      ApiUrls.objectsListSearch,
      { params }
    );

    const { data } = response;

    yield put(setSearchObjectsLoading(false));
    yield put(fetchSearchObjectsSuccess(data));

  } catch (error){
    yield put(fetchSearchObjectsFailure(error as AxiosError));
    yield put(setSearchObjectsLoading(false));
  }
}


function* Saga(): Generator {
  yield all([
    takeLatest(FETCH_DATA_REQUEST, fetchData),
    takeLatest(FETCH_SINGLE_DATA_REQUEST, fetchSingleData),
    takeLatest(FETCH_SEARCH_OBJECTS_REQUEST, fetchSearchedObjects),
  ]);
}

export default Saga;
