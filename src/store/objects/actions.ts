import { AxiosError } from 'axios';

import { IObjectTableItem } from 'containers/ObjectsList/types';

import { IListResponseModel } from 'store/types';
import { IFetchDataAction } from 'store/table/types';

import createAction from 'utils/createAction';

import { IFetchSingleDataAction, ISearchObjectsAction } from './types';

const STATE_KEY = '@OBJECTS';


export const FETCH_DATA_REQUEST = `${STATE_KEY}_FETCH_DATA_REQUEST`;
export const FETCH_DATA_SUCCESS = `${STATE_KEY}_FETCH_DATA_SUCCESS`;
export const FETCH_DATA_FAILURE = `${STATE_KEY}_FETCH_DATA_FAILURE`;

export const FETCH_SINGLE_DATA_REQUEST = `${STATE_KEY}_FETCH_SINGLE_DATA_REQUEST`;
export const FETCH_SINGLE_DATA_SUCCESS = `${STATE_KEY}_FETCH_SINGLE_DATA_SUCCESS`;
export const FETCH_SINGLE_DATA_FAILURE = `${STATE_KEY}_FETCH_SINGLE_DATA_FAILURE`;
export const SET_SINGLE_DATA_LOADING = `${STATE_KEY}_SET_SINGLE_DATA_LOADING`;

export const FETCH_SEARCH_OBJECTS_REQUEST = `${STATE_KEY}_FETCH_SEARCH_OBJECTS_REQUEST`;
export const FETCH_SEARCH_OBJECTS_SUCCESS = `${STATE_KEY}_FETCH_SEARCH_OBJECTS_SUCCESS`;
export const FETCH_SEARCH_OBJECTS_FAILURE = `${STATE_KEY}_FETCH_SEARCH_OBJECTS_FAILURE`;
export const SET_SEARCH_OBJECTS_LOADING = `${STATE_KEY}_SET_SEARCH_OBJECTS_LOADING`;


export const fetchDataRequest = createAction<IFetchDataAction>(FETCH_DATA_REQUEST);
export const fetchDataSuccess = createAction<IListResponseModel<IObjectTableItem>>(FETCH_DATA_SUCCESS);
export const fetchDataFailure = createAction<AxiosError>(FETCH_DATA_FAILURE);

export const fetchSingleDataRequest = createAction<IFetchSingleDataAction>(FETCH_SINGLE_DATA_REQUEST);
export const fetchSingleDataSuccess = createAction<IObjectTableItem>(FETCH_SINGLE_DATA_SUCCESS);
export const fetchSingleDataFailure = createAction<AxiosError>(FETCH_SINGLE_DATA_FAILURE);
export const setObjectDetailLoading = createAction<boolean>(SET_SINGLE_DATA_LOADING);

export const fetchSearchObjectsRequest = createAction<ISearchObjectsAction>(FETCH_SEARCH_OBJECTS_REQUEST);
export const fetchSearchObjectsSuccess = createAction<Array<IObjectTableItem>>(FETCH_SEARCH_OBJECTS_SUCCESS);
export const fetchSearchObjectsFailure = createAction<AxiosError>(FETCH_SEARCH_OBJECTS_FAILURE);
export const setSearchObjectsLoading = createAction<boolean>(SET_SEARCH_OBJECTS_LOADING);
