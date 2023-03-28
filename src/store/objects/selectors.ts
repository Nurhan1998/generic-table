import { createSelector } from 'reselect';

import { IObjectTableItem } from 'containers/ObjectsList/types';

import { IAppState } from 'store/types';
import { TObjectDetailReturnType, TObjectDetailStoreRecord } from 'store/objects/types';

const selectState = (state: IAppState): TObjectDetailStoreRecord | undefined => state.objects;

export const makeSelectObjectDetailInfo: TObjectDetailReturnType<IObjectTableItem | undefined> = createSelector(
  selectState,
  (state?: TObjectDetailStoreRecord): IObjectTableItem | undefined => state?.getIn(['detail', 'data'])
);

export const makeSelectObjectDetailLoading: TObjectDetailReturnType<boolean | undefined> = createSelector(
  selectState,
  (state?: TObjectDetailStoreRecord): boolean | undefined => state?.getIn(['detail', 'loading'])
);

export const makeSelectSearchObjectsLoading: TObjectDetailReturnType<boolean | undefined> = createSelector(
  selectState,
  (state?: TObjectDetailStoreRecord): boolean | undefined => state?.getIn(['items', 'loading'])
);

export const makeSelectSearchObjectsInfo: TObjectDetailReturnType<IObjectTableItem[] | undefined> = createSelector(
  selectState,
  (state?: TObjectDetailStoreRecord) => state?.getIn(['items', 'data'])
);

