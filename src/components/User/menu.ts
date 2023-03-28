import { Dispatch } from 'redux';
import { NextRouter } from 'next/router';

import { SIGN_IN } from 'configuration/urls';
import { EStorageKeys } from 'configuration/types/storageKeys';

import { logout } from 'store/auth/actions';

import { removeStorageItem } from 'utils/storageHelpers';


export interface IProfileMenuItem {
  label: string;
  onClick?: () => void,
}
export type TGetProfileMenu = (dispatch: Dispatch, router: NextRouter) => Array<IProfileMenuItem>;


export const getProfileMenu: TGetProfileMenu = (dispatch, router) => ([
  {
    label: 'Профиль',
  },
  {
    label: 'Account',
  },
  {
    label: 'Dashboard'
  },
  {
    label: 'Выйти из аккаунта',
    onClick: () => {
      removeStorageItem(EStorageKeys.TOKEN);
      dispatch(logout());
      router.push(SIGN_IN);
    },
  }
]);
