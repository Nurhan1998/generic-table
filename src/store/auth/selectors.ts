import { createSelector } from 'reselect';

import { IAppState } from 'store/types';

import { hasPermission, hasPermissions } from 'utils/permissions';

import { EPermissionAction, IPermission, IProfile, TAuthSelectorReturnType, TAuthStoreRecord } from './types';

const selectState = (state: IAppState): TAuthStoreRecord | undefined => state.auth;


export const makeSelectAccessToken: TAuthSelectorReturnType<string | null> = createSelector(
  selectState,
  (state?: TAuthStoreRecord): string | null => state?.getIn(['token', 'access']) || null,
);

export const makeSelectRefreshToken: TAuthSelectorReturnType<string | null> = createSelector(
  selectState,
  (state?: TAuthStoreRecord): string | null => state?.getIn(['token', 'refresh']) || null,
);

export const makeSelectSignInFetching: TAuthSelectorReturnType<boolean> = createSelector(
  selectState,
  (state?: TAuthStoreRecord) => state?.getIn(['signIn', 'fetching']) || false
);

export const makeSelectProfileInfo: TAuthSelectorReturnType<IProfile | null> = createSelector(
  selectState,
  (state?: TAuthStoreRecord): IProfile | null => {
    const profile = state?.getIn(['profile', 'data']);
    if (!profile) return null;
    return profile.toJS();
  }
);

export const makeSelectHasPermission = (
  permission?: IPermission,
  action: EPermissionAction = EPermissionAction.VIEW
): TAuthSelectorReturnType<boolean> => createSelector(
  selectState,
  (state?: TAuthStoreRecord): boolean => {
    if (!permission || !state) return false;
    const _profile = state.getIn(['profile', 'data']);
    if (!_profile) return false;
    const profile: IProfile = _profile.toJS();
    return hasPermission(profile, permission, action);
  }
);

export const makeSelectHasPermissions = (
  permission?: IPermission,
  actions: Array<EPermissionAction> = [EPermissionAction.VIEW],
): TAuthSelectorReturnType<boolean> => createSelector(
  selectState,
  (state?: TAuthStoreRecord): boolean => {
    if (!permission || !state) return false;
    const _profile = state.getIn(['profile', 'data']);
    if (!_profile) return false;
    const profile: IProfile = _profile.toJS();
    return hasPermissions(profile, permission, actions);
  },
);
