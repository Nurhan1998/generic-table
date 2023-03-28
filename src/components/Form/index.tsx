import { FormEvent, FormEventHandler, memo, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Box } from '@mui/material';

import { EFormOrientation, IConfig, IFormProps } from 'components/Form/types';

import { makeSelectFormValues, makeSelectFormLoading } from 'store/forms/selectors';
import { setFormValue, initForm, removeForm } from 'store/forms/actions';
import { TFieldValue } from 'store/forms/types';

import safeGet from 'utils/safeGet';

import Field from './Field';
import useStyles from './styles';


const Form = (props: IFormProps): JSX.Element => {
  const { classes } = useStyles();
  const {
    disabled,
    name,
    loading,
    config,
    orientation = EFormOrientation.VERTICAL,
    className,
    validateSchema,
    outsideInitialization = false,
    initials,
    onFieldValueChange,
  } = props;
  const dispatch = useDispatch();
  const formValues = useSelector(makeSelectFormValues(name));
  const fetching = useSelector(makeSelectFormLoading(name));

  const handleSubmit = (e: FormEventHandler<HTMLFormElement> & FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleFieldChange = (field: string) => (value: TFieldValue): void => {
    dispatch(setFormValue({
      form: name,
      field,
      validateSchema,
      value,
    }));
    if (onFieldValueChange) {
      onFieldValueChange(field, value);
    }
  };

  const fields = useMemo<Array<IConfig>>(
    () => config.filter(item => {
      if (typeof item.showIf === 'function') return item.showIf(formValues);
      return true;
    }),
    [config, formValues],
  );

  useEffect(
    () => {
      if (!outsideInitialization) {
        dispatch(initForm({ form: name, config, initials }));
      }

      return () => {
        if (!outsideInitialization) {
          dispatch(removeForm({ form: name }));
        }
      };
    },
    // need to call this effect only once at render
    // eslint-disable-next-line
    [],
  );

  if (fetching) {
    return <p>Loading...</p>;
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className={cn(classes.root, safeGet(classes, orientation.toString(), EFormOrientation.VERTICAL), className)}
      noValidate
      autoComplete="off"
    >
      {fields.map((item, idx) => {
        const key = `FORM_${name}_${item.name}_FIELD_${idx}`;
        const value = formValues[item.name];
        const fieldDisabled = typeof item.disabledIf === 'function'
          ? item.disabledIf(formValues)
          : false;
        return (
          <Field
            form={name}
            key={key}
            field={item}
            onChange={handleFieldChange(item.name)}
            value={value}
            rows={item.rows}
            disabled={loading || fieldDisabled || disabled}
            className={classes.inputRoot}
          />
        );
      })}
    </Box>
  );
};


export default memo(Form);
