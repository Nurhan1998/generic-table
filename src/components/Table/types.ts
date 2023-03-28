import { IConfig } from 'components/Form/types';

import { IPermission } from 'store/auth/types';
import { ITableItem } from 'store/table/types';

export interface ITableColumn {
  id: string;
  label: string;
  sortable?: boolean;
}

export interface ITableProps<T extends ITableItem> {
  name: string;
  normalize: (item: T) => Array<string | number | JSX.Element>;
  columns: Array<ITableColumn>;
  fetchAction: string;
  filterConfig?: Array<IConfig>;
  reflectQuery?: boolean;
  permissionKey?: IPermission;
  disableSearch?: boolean;
  handleCreateClick?: () => void;
  searchQueryKey?: string;
}
