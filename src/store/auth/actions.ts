import { AxiosError } from 'axios';

import createAction from 'utils/createAction';

import { ITokenState, TAuthRequest, IProfile } from './types';

const STATE_KEY = '@AUTH';

export const SET_TOKEN = `${STATE_KEY}_SET_TOKEN`;

export const SIGN_IN_REQUEST = `${STATE_KEY}_SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${STATE_KEY}_SIGN_IN_SUCCESS`;
export const SIGN_IN_FAILURE = `${STATE_KEY}_SIGN_IN_FAILURE`;

export const LOGOUT = `${STATE_KEY}_LOGOUT`;

export const GET_PROFILE_INFO_REQUEST = `${STATE_KEY}_GET_PROFILE_INFO_REQUEST`;
export const GET_PROFILE_INFO_SUCCESS = `${STATE_KEY}_GET_PROFILE_INFO_SUCCESS`;
export const GET_PROFILE_INFO_FAILURE = `${STATE_KEY}_GET_PROFILE_INFO_FAILURE`;
export const RESET_AUTH_INFO = `${STATE_KEY}_RESET_AUTH_INFO`;

export const setToken = createAction<ITokenState>(SET_TOKEN);

export const signInRequest = createAction<TAuthRequest>(SIGN_IN_REQUEST);
export const signInSuccess = createAction<ITokenState>(SIGN_IN_SUCCESS);
export const signInFailure = createAction<AxiosError>(SIGN_IN_FAILURE);

export const logout = createAction(LOGOUT);

export const getProfileInfoRequest = createAction(GET_PROFILE_INFO_REQUEST);
export const getProfileInfoSuccess = createAction<IProfile>(GET_PROFILE_INFO_SUCCESS);
export const getProfileInfoFailure = createAction<AxiosError>(GET_PROFILE_INFO_FAILURE);
export const resetAuthInfo = createAction(RESET_AUTH_INFO);
