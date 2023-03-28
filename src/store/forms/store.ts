import { fromJS } from 'immutable';

import { EFieldType, IConfig } from 'components/Form/types';

import {
  CLEAR_FORM,
  INIT_FORM,
  REMOVE_FORM,
  SET_FORM_ERROR,
  SET_FORM_INITIAL_VALUES,
  SET_FORM_LOADING,
  SET_FORM_TOUCHED,
  SET_FORM_VALUE,
} from 'store/forms/actions';

import createReducer from 'utils/createReducer';
import normalizeFormFields from 'utils/normalizeFormFields';

import {
  IFormPayload,
  IInitFormAction,
  ISetFieldErrorAction,
  ISetFieldValueAction,
  ISetFormLoadingAction,
  ISetInitValuesFormAction,
  ISetIsTouchedAction,
  TFormState,
  TFormStateHandler,
} from './types';


const initialState: TFormState = fromJS({});

const initForm: TFormStateHandler<IInitFormAction> = (state, action) => {
  const { form, config, initials } = action.payload;
  if (state.has(form)) return state;
  return state.set(form, fromJS({
    _META: { config, loading: false },
    values: normalizeFormFields(config, initials),
    errors: null,
  }));
};

const setFieldValue: TFormStateHandler<ISetFieldValueAction> = (state, action) => {
  const { form, field, value } = action.payload;
  if (!state.has(form)) return state;
  const config: Array<IConfig> = state.getIn([form, '_META', 'config'])?.toJS() || [];
  const targetField: IConfig | undefined = config.find(item => item.name === field);
  const validValue = targetField
    ? (
      targetField.type === EFieldType.SELECT
        ? (
          !value
            ? []
            : Array.isArray(value) ? value : [value]
        )
        : value
    )
    : value;
  return state.setIn([form, 'values', field, 'value'], validValue);
};

const clearForm: TFormStateHandler<IFormPayload> = (state, action) => {
  const { form } = action.payload;
  if (!state.has(form)) return state;
  const config: Array<IConfig> = state.getIn([form, '_META', 'config']).toJS();
  return state.set(form, fromJS({ _META: { config }, values: normalizeFormFields(config) }));
};

const removeForm: TFormStateHandler<IFormPayload> = (state, action) => {
  const { form } = action.payload;
  if (!state.has(form)) return state;
  return state.remove(form);
};

const setFormInitialValues: TFormStateHandler<ISetInitValuesFormAction> = (state, action) => {
  const { form, instance } = action.payload;
  if (!state.has(form)) return state;
  const config: IConfig[] = state.getIn([form, '_META', 'config']).toJS();
  return state.setIn(
    [form, 'values'],
    fromJS(normalizeFormFields(config, instance))
  );
};

const setFieldError: TFormStateHandler<ISetFieldErrorAction> = (state, action) => {
  const { form, error } = action.payload;
  if (!state.has(form)) return state;
  return state.setIn([form, 'errors'], error);
};

const setTouched: TFormStateHandler<ISetIsTouchedAction> = (state, action) => {
  const { form, field, isTouched } = action.payload;
  if (!state.has(form)) return state;
  return state.setIn([form, 'values', field, 'isTouched'], isTouched);
};

const setFormLoading: TFormStateHandler<ISetFormLoadingAction> = (state, action) => {
  const { form, value } = action.payload;
  if (!state.has(form)) return state;
  return state.setIn([form, '_META', 'loading'], value);
};

const setFormIsValid: TFormStateHandler<ISetFieldErrorAction> = (state, action) => {
  const { form, error } = action.payload;
  if (!state.has(form)) return state;
  const _form = state.get(form);
  const isTouched = _form.getIn(['_META', 'isTouched']) || false;
  const isValid = isTouched && !error;
  return state.setIn([form, '_META', 'isValid'], isValid);
};

const setFormIsTouched: TFormStateHandler<ISetIsTouchedAction> = (state, action) => {
  const { form } = action.payload;
  if (!state.has(form)) return state;
  return state.setIn([form, '_META', 'isTouched'], true);
};

export default createReducer<TFormState>(initialState, {
  [INIT_FORM]: initForm,
  [SET_FORM_VALUE]: setFieldValue,
  [CLEAR_FORM]: clearForm,
  [REMOVE_FORM]: removeForm,
  [SET_FORM_INITIAL_VALUES]: setFormInitialValues,
  [SET_FORM_ERROR]: [setFieldError, setFormIsValid],
  [SET_FORM_TOUCHED]: [setTouched, setFormIsTouched],
  [SET_FORM_LOADING]: setFormLoading,
});

