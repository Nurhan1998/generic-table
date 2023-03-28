import {
  IFormPayload,
  IInitFormAction,
  ISetFieldErrorAction,
  ISetFieldValueAction,
  ISetInitValuesFormAction,
  ISetIsTouchedAction,
  ISetFormLoadingAction,
} from 'store/forms/types';

import createAction from 'utils/createAction';

export const STATE_KEY = '@FORMS';

export const INIT_FORM = `${STATE_KEY}_INIT_FORM`;
export const SET_FORM_VALUE = `${STATE_KEY}_SET_FORM_VALUE`;
export const CLEAR_FORM = `${STATE_KEY}_CLEAR_FORM`;
export const SET_FORM_INITIAL_VALUES = `${STATE_KEY}_SET_FORM_INITIAL_VALUES`;
export const REMOVE_FORM = `${STATE_KEY}_REMOVE_FORM`;
export const SET_FORM_ERROR = `${STATE_KEY}_SET_FORM_ERROR`;
export const SET_FORM_TOUCHED = `${STATE_KEY}_SET_FORM_IS_TOUCHED`;
export const SET_FORM_LOADING = `${STATE_KEY}_SET_FORM_IS_LOADING`;

export const initForm = createAction<IInitFormAction>(INIT_FORM);
export const setFormValue = createAction<ISetFieldValueAction>(SET_FORM_VALUE);
export const clearForm = createAction(CLEAR_FORM);
export const setFormInitialValues = createAction<ISetInitValuesFormAction>(SET_FORM_INITIAL_VALUES);
export const removeForm = createAction<IFormPayload>(REMOVE_FORM);
export const setFormError = createAction<ISetFieldErrorAction>(SET_FORM_ERROR);
export const setFormTouched = createAction<ISetIsTouchedAction>(SET_FORM_TOUCHED);
export const setFormLoading = createAction<ISetFormLoadingAction>(SET_FORM_LOADING);
