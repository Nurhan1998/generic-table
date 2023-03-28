import { all, takeLatest, call, put } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';
import Router from 'next/router';

import request from 'api/index';
import { ApiUrls } from 'api/apiUrls';

import { EStorageKeys } from 'configuration/types/storageKeys';
import { HOME_PAGE } from 'configuration/urls';

import { IPayloadAction } from 'store/types';
import { ITokenState, TAuthRequest } from 'store/auth/types';

import { setStorage } from 'utils/storageHelpers';

import {
  GET_PROFILE_INFO_REQUEST,
  getProfileInfoFailure,
  getProfileInfoSuccess,
  setToken,
  SIGN_IN_REQUEST,
  signInSuccess,
  signInFailure,
} from './actions';
import { IProfile } from './types';


function* signIn(action: IPayloadAction<TAuthRequest>) {
  try {
    const response: AxiosResponse<ITokenState> = yield call(request.post, ApiUrls.signIng, action.payload);

    yield call(setStorage, EStorageKeys.TOKEN, response.data);
    yield put(setToken(response.data));
    yield put(signInSuccess(response.data));
    yield call(Router.push, HOME_PAGE);
  } catch (error) {
    console.error(error);
    yield put(signInFailure(error as AxiosError));
  }
}

function* getUserInfo() {
  try {
    const response: AxiosResponse<IProfile> = yield call(request.get, ApiUrls.me);
    const { data } = response;
    yield put(getProfileInfoSuccess(data));
  } catch (error) {
    console.error(error);
    yield put(getProfileInfoFailure(error as AxiosError));
  }
}

function* Saga(): Generator{
  yield all([
    takeLatest(SIGN_IN_REQUEST, signIn),
    takeLatest(GET_PROFILE_INFO_REQUEST, getUserInfo),
  ]);
}

export default Saga;
