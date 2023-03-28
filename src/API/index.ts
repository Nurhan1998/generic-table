import Axios, { AxiosResponse, AxiosError } from 'axios';

import { ApiUrls } from 'api/apiUrls';

import { EStorageKeys } from 'configuration/types/storageKeys';

import { ITokenState } from 'store/auth/types';

import { getStorageData, setStorage } from 'utils/storageHelpers';

import { IRefreshTokenResponse } from './types';

const mainURL = process.env.API_BASE_URL;
const baseURL = `${mainURL}api/v1`;

const instance = Axios.create({ baseURL });

instance.interceptors.request.use(
  config => {
    const token = getStorageData<ITokenState>(EStorageKeys.TOKEN);

    if (token && token.access && config.headers) {
      config.headers.Authorization = `Bearer ${token.access}`;
      config.headers['Accept-Language'] = 'ru-RU';
    }

    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if(error.response.status === 401){
      originalRequest._retry = true;
      try {
        const { data } = await refreshAccessToken();
        const token = getStorageData<ITokenState>(EStorageKeys.TOKEN);

        setStorage(EStorageKeys.TOKEN, {
          refresh: token ? token.refresh : '',
          access: data.access,
        });

        instance.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
      } catch (e) {
        const { response: refreshResponse } = e as AxiosError;
        if (refreshResponse?.status === 401) {
          return Promise.reject(error);
        }
      }
      return instance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export const refreshAccessToken = (): Promise<AxiosResponse<IRefreshTokenResponse>> => {
  const token = getStorageData<ITokenState>(EStorageKeys.TOKEN);
  if (!token) return Promise.reject({ response: { status: 401 } } as AxiosError);
  return instance.post(ApiUrls.refreshToken, { refresh: token.refresh });
};

export default instance;
