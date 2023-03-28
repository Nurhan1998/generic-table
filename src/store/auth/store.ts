import { fromJS } from 'immutable';
import { AxiosError } from 'axios';

import createReducer from 'utils/createReducer';
import getRequestState from 'utils/requestState';

import {
  RESET_AUTH_INFO,
  SET_TOKEN,

  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,

  LOGOUT,

  GET_PROFILE_INFO_REQUEST,
  GET_PROFILE_INFO_FAILURE,
  GET_PROFILE_INFO_SUCCESS,
} from './actions';
import {
  ITokenState,
  TAuthStoreRecord,
  TAuthHandler,
  IProfile,
} from './types';


const initialState: TAuthStoreRecord = fromJS({
  token: null,

  signIn: getRequestState<ITokenState>(),
  profile: getRequestState<IProfile>(),
});

const setToken: TAuthHandler<ITokenState> = (state, action) => state.set('token', action.payload);

const resetAuthState: TAuthHandler = state => state;

const setSignInLoading = (value: boolean): TAuthHandler =>
  state => state.setIn(['signIn', 'fetching'], value);
const setSignInResponse: TAuthHandler<ITokenState> = (state, action) =>
  state.setIn(['signIn', 'data'], fromJS(action.payload));
const setSignInError: TAuthHandler<AxiosError> = (state, action) =>
  state.setIn(['signIn', 'error'], action.payload);

const logout: TAuthHandler = state => state.set('token', null);

const setProfileFetching = (value: boolean): TAuthHandler => state =>
  state.setIn(['profile', 'fetching'], value);
const setProfileData: TAuthHandler<IProfile> = (state, action) =>
  state.setIn(['profile', 'data'], fromJS(action.payload));
const setProfileError: TAuthHandler<AxiosError> = (state, action) =>
  state.setIn(['profile', 'error'], action.payload);

export default createReducer<TAuthStoreRecord>(initialState, {
  [SET_TOKEN]: setToken,
  [RESET_AUTH_INFO]: resetAuthState,

  [SIGN_IN_REQUEST]: setSignInLoading(true),
  [SIGN_IN_SUCCESS]: [setSignInLoading(false), setSignInResponse],
  [SIGN_IN_FAILURE]: [setSignInLoading(false), setSignInError],

  [LOGOUT]: logout,

  [GET_PROFILE_INFO_REQUEST]: setProfileFetching(true),
  [GET_PROFILE_INFO_SUCCESS]: [setProfileFetching(false), setProfileData],
  [GET_PROFILE_INFO_FAILURE]: [setProfileFetching(false), setProfileError],
});
