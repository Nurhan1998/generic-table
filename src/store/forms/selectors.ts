import { createSelector } from 'reselect';

import { IConfig } from 'components/Form/types';
import { getSingleValue } from 'components/Select/utils';
import { FILTERS_FORM_NAME_POSTFIX } from 'components/Table/constants';

import { IAppState } from 'store/types';
import { TFormattedFormValues, TFormSelectorReturnType, TFormState, TFormValues } from 'store/forms/types';
import { IFilterChip } from 'store/table/types';

import { makeFormattedFormValues } from 'utils/normalizeFormFields';


const selectState = (state: IAppState): TFormState | undefined => state.forms;

export const makeSelectFormValues = (form: string): TFormSelectorReturnType<TFormattedFormValues> =>
  createSelector(
    selectState,
    (state?: TFormState) => {
      const values: TFormValues = state?.getIn([form, 'values'])?.toJS() || {};
      return makeFormattedFormValues(values);
    }
  );

export const makeSelectFormFieldError = (
  form: string,
  field: string
): TFormSelectorReturnType<string[]> => createSelector(
  selectState,
  (state?: TFormState) => state?.getIn([form, 'errors', field]) || []
);

export const makeSelectFormTouchedField = (form: string, field: string): TFormSelectorReturnType<boolean> =>
  createSelector(selectState, (state?: TFormState) =>
    state?.getIn([form, 'values', field, 'isTouched']) || false
  );


export const makeSelectFormLoading = (form: string): TFormSelectorReturnType<boolean> =>
  createSelector(
    selectState,
    (state?: TFormState) => {
      const loading = state?.getIn([form, '_META', 'loading']);
      if (typeof loading !== 'boolean') return true;
      return loading;
    }
  );

export const makeSelectFormIsTouched = (form: string): TFormSelectorReturnType<boolean> =>
  createSelector(selectState, (state?: TFormState) => {
    const isTouched = state?.getIn([form, '_META', 'isTouched']);
    if (typeof isTouched !== 'boolean') return false;
    return isTouched;
  });

export const makeSelectFormIsValid = (form: string): TFormSelectorReturnType<boolean> =>
  createSelector(selectState, (state?: TFormState) => {
    const isValid = state?.getIn([form, '_META', 'isValid']);
    if (typeof isValid !== 'boolean') return false;
    return isValid;
  });


export const makeSelectFormValuesAsFilterChips = (table: string): TFormSelectorReturnType<Array<IFilterChip>> =>
  createSelector(
    selectState,
    (state?: TFormState): Array<IFilterChip> => {
      const form = `${table}${FILTERS_FORM_NAME_POSTFIX}`;
      const formValues: TFormValues = state?.getIn([form, 'values'])?.toJS() || {};
      const config: Array<IConfig> = state?.getIn([form, '_META', 'config'])?.toJS() || [];

      return Object.keys(formValues).reduce(
        (memo: Array<IFilterChip>, curr: string): Array<IFilterChip> => {
          const instance: IConfig | undefined = config.find(item => item.name === curr);

          if (instance && instance.showIf) {
            const result = instance.showIf(makeFormattedFormValues(formValues));
            if (!result) return memo;
          }

          const field = formValues[curr];
          if (!field.value) return memo;
          if (Array.isArray(field.value) && !field.value.length) return memo;

          const finalValue = Array.isArray(field.value)
            ? field.value
              .map(item => {
                if (!instance || !instance.renderChipValue) return item;
                return instance.renderChipValue(item);
              })
              .join(', ')
            : field.value;

          return [
            ...memo,
            {
              displayName: instance?.label || curr,
              displayValue: finalValue,
              fieldName: curr,
              value: getSingleValue(field.value),
            }
          ];
        },
        [],
      );
    },
  );

