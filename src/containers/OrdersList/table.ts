import { ITableColumn } from 'components/Table/types';

import { IPermission } from 'store/auth/types';


export const columns: Array<ITableColumn> = [
  {
    id: 'number',
    label: 'Номер приказа',
  },
  {
    id: 'date_created',
    label: 'Дата создания',
  },
];

export const permissionKey: IPermission = {
  appName:
  'objective',
  // 'orders',
  modelName:
  'objective',
  // 'orders',
};
