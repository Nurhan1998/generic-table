import { fromJS } from 'immutable';

import { IObjectTableItem } from 'containers/ObjectsList/types';

import { TObjectDetailHandler, TObjectDetailStoreRecord } from 'store/objects/types';
import {
  RESET_AUTH_INFO,
} from 'store/auth/actions';
import {
  FETCH_SINGLE_DATA_FAILURE,
  FETCH_SINGLE_DATA_REQUEST,
  FETCH_SINGLE_DATA_SUCCESS
} from 'store/objects/actions';

import createReducer from 'utils/createReducer';

const initialState: TObjectDetailStoreRecord = fromJS({
});

const setObjectDetailInfo: TObjectDetailHandler<IObjectTableItem> = (
  state,
  action
) => state.setIn('detail.data', action.payload);

const resetObjectDetailInfo: TObjectDetailHandler<TObjectDetailStoreRecord> = state => state;

const setObjectDetailLoading = (
  loading: boolean
): TObjectDetailHandler => state => state.setIn('detail.loading', loading);

export default createReducer<TObjectDetailStoreRecord>(initialState, {
  [RESET_AUTH_INFO]: resetObjectDetailInfo,

  [FETCH_SINGLE_DATA_REQUEST]: setObjectDetailLoading(true),
  [FETCH_SINGLE_DATA_SUCCESS]: [setObjectDetailLoading(false), setObjectDetailInfo],
  [FETCH_SINGLE_DATA_FAILURE]: [setObjectDetailLoading(false), setObjectDetailInfo],
});

