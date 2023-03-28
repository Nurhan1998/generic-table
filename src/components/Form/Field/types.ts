import { IConfig } from 'components/Form/types';

import { TFieldValue } from 'store/forms/types';


export interface ISharedProps {
  value: TFieldValue;
  onChange: (value: TFieldValue) => void;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  onFocus?: () => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
}

export interface IFieldProps {
  form: string;
  field: IConfig;
  onChange: (e: TFieldValue) => void;
  value: TFieldValue;
  disabled?: boolean;
  className?: string;
  rows?: number;
}
