import { AxiosError } from 'axios';

import { IOrderTableItem } from 'containers/OrdersList/types';

import { IFetchDataAction } from 'store/objects/types';
import { IListResponseModel } from 'store/types';

import createAction from 'utils/createAction';

const STATE_KEY = '@ORDERS';

export const SET_ORDERS_LIST_LOADING = `${STATE_KEY}_ORDER_LIST_LOADING`;

export const FETCH_ORDERS_LIST_REQUEST = `${STATE_KEY}_FETCH_ORDERS_LIST_REQUEST`;
export const FETCH_ORDERS_LIST_SUCCESS = `${STATE_KEY}_FETCH_ORDERS_LIST_SUCCESS`;
export const FETCH_ORDERS_LIST_FAILURE = `${STATE_KEY}_FETCH_ORDERS_LIST_FAILURE`;


export const setOrderListLoading = createAction<boolean>(SET_ORDERS_LIST_LOADING);

export const fetchOrdersListRequest = createAction<IFetchDataAction>(FETCH_ORDERS_LIST_REQUEST);
export const fetchOrdersListSuccess = createAction<IListResponseModel<IOrderTableItem>>(FETCH_ORDERS_LIST_SUCCESS);
export const fetchOrdersListFailure = createAction<AxiosError>(FETCH_ORDERS_LIST_FAILURE);


