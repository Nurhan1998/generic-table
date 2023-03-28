import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';

import requests from 'api/index';
import { ApiUrls } from 'api/apiUrls';

import { IDocumentTableItem } from 'containers/DocumentsList/types';

import { IListResponseModel, IPayloadAction } from 'store/types';
import { IFetchDataAction } from 'store/table/types';
import { setTableData, setTableLoading, setTableTotalCount } from 'store/table/actions';
import { FETCH_DOCUMENTS_DATA_REQUEST, fetchDataFailure, fetchDataSuccess } from 'store/documents/actions';

function* fetchDocumentsData(action: IPayloadAction<IFetchDataAction>): Generator {
  const { table, params } = action.payload;
  yield put(setTableLoading({ name: table, value: true }));

  try {
    const response = yield call(
      requests.get,
      ApiUrls.documentList,
      { params },
    );
    const { data } = response as AxiosResponse<IListResponseModel<IDocumentTableItem>>;
    yield put(setTableData({ name: table, data: data.results }));
    yield put(setTableTotalCount({ name: table, value: data.count }));
    yield put(setTableLoading({ name: table, value: false }));
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error as AxiosError));
    yield put(setTableLoading({ name: table, value: false }));
  }
}

function* Saga(): Generator {
  yield all([
    takeLatest(FETCH_DOCUMENTS_DATA_REQUEST, fetchDocumentsData),
  ]);
}

export default Saga;
