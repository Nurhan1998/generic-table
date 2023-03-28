import { ChangeEvent } from 'react';
import MuiTextField from '@mui/material/TextField';

import { ITextFieldProps } from './types';

const TextField = (props: ITextFieldProps): JSX.Element => {
  const { inputType, multiline, rows, onChange, ...rest } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  return (
    <MuiTextField
      type={inputType}
      multiline={multiline}
      rows={rows}
      autoComplete="current-password"
      onChange={handleChange}
      {...rest}
    />
  );
};

export default TextField;
