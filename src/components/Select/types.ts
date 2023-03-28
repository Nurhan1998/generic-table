import { IConfig } from 'components/Form/types';
import { ISharedProps } from 'components/Form/Field/types';

export interface ISelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ISelectProps extends ISharedProps {
  field: IConfig;
}