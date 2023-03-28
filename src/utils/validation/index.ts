import * as yup from 'yup';
import { ObjectShape } from 'yup/lib/object';

import { TFormValues } from 'store/forms/types';

export const numberYup = yup.number();
export const stringYup = yup.string().trim();
export const stringYupRequired = stringYup.required('Field is required');
export const stringRequiredWithEmail = stringYupRequired.email('Email should be valid');
export const stringYupPassword = stringYupRequired
  .min(6, 'Min length of the password should be 6 symbols')
  .max(16, 'Max length of the password should be 16 symbols')
  .matches(/[a-zA-Z0-9]/, 'Password should contain only latin symbols');


export const executeValidation = (
  schema: ObjectShape,
  values: TFormValues
): Promise<null | Record<string, string[]>> =>
  new Promise((resolve, reject) => {
    yup
      .object()
      .shape(schema)
      .validate(values, { abortEarly: false })
      .then(reject)
      .catch(resolve);
  });
