import { ISharedProps } from 'components/Form/Field/types';


export interface ITextFieldProps extends ISharedProps {
  inputType?: string;
  multiline?: boolean;
  rows?: number;
}
