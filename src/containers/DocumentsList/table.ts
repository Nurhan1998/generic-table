import { ITableColumn } from 'components/Table/types';

import { IPermission } from 'store/auth/types';

export const columns: Array<ITableColumn> = [
  {
    id: 'name',
    label: 'Шаблоны',
  },
  {
    id: 'date_created',
    label: 'Дата создания',
  },
];

export const permissionKey: IPermission = {
  appName: 'documents',
  modelName: 'documents',
};
