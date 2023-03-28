import { IConfig, EFieldType } from 'components/Form/types';

import { IFormItem, TFieldValue, TFormattedFormValues, TFormValues } from 'store/forms/types';

import safeGet from 'utils/safeGet';


export const makeFormattedFormValues = (values: TFormValues): TFormattedFormValues => Object.keys(values).reduce(
  (memo: TFormattedFormValues, curr) => ({
    ...memo,
    [curr]: safeGet(values, `${curr}.value`, ''),
  }),
  {} as TFormattedFormValues,
);

const normalizeFormFields = (
  config: Array<IConfig>,
  initialValues?: Record<string, TFieldValue | undefined>,
): Record<string, IFormItem> => config.reduce(
  (memo, curr) => {
    const value = safeGet(initialValues, curr.name, '');
    return {
      ...memo,
      [curr.name] : {
        value: curr.type === EFieldType.SELECT
          ? (
            Array.isArray(value)
              ? value
              : Boolean(value) ? [value] : []
          )
          : value,
        isTouched: false
      }
    };
  },
  {} as Record<string, IFormItem>
);

export default normalizeFormFields;
