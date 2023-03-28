import { AxiosError } from 'axios';

import { ResponseGenericType } from 'store/types';

const getRequestState = <R, E = AxiosError>(): ResponseGenericType<R, E> => ({
  fetching: false,
  data: null,
  error: null
});

export default getRequestState;
