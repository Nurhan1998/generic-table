import { AxiosError } from 'axios';

import { IDocumentTableItem } from 'containers/DocumentsList/types';

import { IListResponseModel } from 'store/types';

import createAction from 'utils/createAction';

import { IFetchDataAction } from 'store/table/types';

const STATE_KEY = '@DOCUMENTS';

export const FETCH_DOCUMENTS_DATA_REQUEST = `${STATE_KEY}_FETCH_DOCUMENTS_DATA_REQUEST`;
export const FETCH_DOCUMENTS_DATA_SUCCESS = `${STATE_KEY}_FETCH_DOCUMENTS_DATA_SUCCESS`;
export const FETCH_DOCUMENTS_DATA_FAILURE = `${STATE_KEY}_FETCH_DOCUMENTS_DATA_FAILURE`;


export const fetchDataRequest = createAction<IFetchDataAction>(FETCH_DOCUMENTS_DATA_REQUEST);
export const fetchDataSuccess = createAction<IListResponseModel<IDocumentTableItem>>(FETCH_DOCUMENTS_DATA_SUCCESS);
export const fetchDataFailure = createAction<AxiosError>(FETCH_DOCUMENTS_DATA_FAILURE);

