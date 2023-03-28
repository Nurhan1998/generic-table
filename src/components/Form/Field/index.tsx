import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { EFieldType } from 'components/Form/types';
import Select from 'components/Select';
import TextField from 'components/TextField';

import { makeSelectFormFieldError, makeSelectFormTouchedField } from 'store/forms/selectors';
import { setFormTouched } from 'store/forms/actions';


import { IFieldProps, ISharedProps } from './types';


const Field = (props: IFieldProps): JSX.Element => {
  const { form, field, onChange, value, disabled, className, rows } = props;
  const {
    name,
    type,
    inputType,
    label,
    placeholder,
    disabled: fieldDisabled,
    className: fieldClassName,
    required = false,
  } = field;

  const dispatch = useDispatch();
  const error = useSelector(makeSelectFormFieldError(form, name));
  const touched = useSelector(makeSelectFormTouchedField(form, name));
  const hasError = !!error.length && touched;

  const handleTouched = (): void => {
    dispatch(setFormTouched({ form, field: name, isTouched: true }));
  };

  const sharedProps: ISharedProps = {
    label,
    placeholder,
    disabled: disabled || fieldDisabled,
    className: cn(className, fieldClassName),
    onFocus: handleTouched,
    value,
    onChange,
    error: hasError,
    helperText: hasError ? error.join(', ') : undefined,
    required,
  };

  switch (type) {
  case EFieldType.SELECT:
    return (
      <Select
        field={field}
        {...sharedProps}
      />
    );
  case EFieldType.TEXTAREA:
    return (
      <TextField
        inputType={inputType}
        multiline
        rows={rows}
        {...sharedProps}
      />
    );
  default:
  case EFieldType.TEXT:
    return (
      <TextField
        inputType={inputType}
        {...sharedProps}
      />
    );
  }
};

export default Field;
