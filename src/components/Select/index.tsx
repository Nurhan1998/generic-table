import { useMemo } from 'react';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

import { ESelectType } from 'components/Form/types';

import { TFieldValue } from 'store/forms/types';

import { ISelectProps, ISelectOption } from './types';
import { getSingleValue } from './utils';

const Select = (props: ISelectProps): JSX.Element => {
  const {
    field,
    value,
    onChange,
    label,
    error,
    helperText,
    className,
    ...rest
  } = props;
  const { selectType, multiple, rawData, name } = field;

  const id = `${name}_select`;

  const rawOptions = useMemo<Array<ISelectOption>>(
    () => {
      if (!rawData) return [{ value: '', label: 'Нет вариантов выбора', disabled: true }];
      return rawData;
    },
    [rawData],
  );

  const handleSelectChange = (e: SelectChangeEvent<TFieldValue>): void => {
    onChange(e.target.value);
  };

  switch (selectType) {
  default:
  case ESelectType.RAW_SELECT:
    return (
      <FormControl
        fullWidth
        error={error}
        className={className}
      >
        <InputLabel id={`${id}_label`}>{label}</InputLabel>
        <MuiSelect
          labelId={`${id}_label`}
          id={id}
          value={multiple ? value : getSingleValue(value)}
          onChange={handleSelectChange}
          multiple={multiple}
          label={label}
          {...rest}
        >
          <MenuItem value="">
            <em>Не выбрано</em>
          </MenuItem>
          {rawOptions.map((item, idx) => (
            <MenuItem value={item.value} key={idx}>
              {item.label}
            </MenuItem>
          ))}
        </MuiSelect>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
};


export default Select;
