import { createWrapper } from 'next-redux-wrapper';
import { createStore, applyMiddleware, compose, CombinedState, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';
import assign from 'lodash/assign';

import { IWithSagaTaskStore, IAppState, IPayloadAction } from './types';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

// eslint-disable-next-line
export const configureStore = <T extends object = never>(initialState: T): IWithSagaTaskStore => {
  const sagaMiddleware = createSagaMiddleware({});
  const middlewares = [sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' as keyof Window]
          ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' as keyof Window]({
            shouldHotReload: false,
          })
          : compose;

  const store: IWithSagaTaskStore = createStore<CombinedState<IAppState>, IPayloadAction, undefined, undefined>(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers)
  );
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const initStore = (initialState: IAppState = {}): IWithSagaTaskStore =>
  configureStore<IAppState>(initialState);

export const wrapper = createWrapper<Store<CombinedState<IAppState>>>(() => initStore(), {
  serializeState: (state: IAppState) => Object.keys(state).reduce(
    (memo: IAppState, curr: string) => assign<IAppState, Partial<IAppState>>(memo, {
      [curr]: state[curr as keyof IAppState]?.toJS(),
    }),
        {} as Record<string, unknown>
  ),
  deserializeState: (state: Record<string, unknown>) => Object.keys(state).reduce(
    (memo: IAppState, curr: string) => assign<IAppState, Partial<IAppState>>(memo, {
      [curr]: fromJS(state[curr])
    }),
        {} as IAppState
  ),
});

export default initStore;
