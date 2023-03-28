import { all, takeLatest, call, put, select, delay } from 'redux-saga/effects';
import { ValidationError } from 'yup';

import { IPayloadAction } from 'store/types';

import { executeValidation } from 'utils/validation';
import { getValidationErrors } from 'utils/validation/errors';

import { INIT_FORM, SET_FORM_VALUE, setFormError, setFormLoading } from './actions';
import { IInitFormAction, ISetFieldValueAction, TFormValues } from './types';
import { makeSelectFormValues } from './selectors';


function* initForm(action: IPayloadAction<IInitFormAction>): Generator {
  const { form } = action.payload;
  yield delay(100);
  yield put(setFormLoading({ form, value: false }));
}

function* validateFormFields(action: IPayloadAction<ISetFieldValueAction>): Generator {
  const { validateSchema, form } = action.payload;
  if (!validateSchema) return;
  const values = yield select(makeSelectFormValues(form));

  try {
    const validationResult = yield call(executeValidation, validateSchema, values as TFormValues);
    const error = getValidationErrors(validationResult as ValidationError);
    yield put(setFormError({ form, error }));
  } catch (error) {
    yield put(setFormError({ form, error: null }));
    // validation passes without errors
    // so just doing nothing here.
  }
}

function* Saga(): Generator {
  yield all([
    takeLatest(INIT_FORM, initForm),
    takeLatest(SET_FORM_VALUE, validateFormFields),
  ]);
}

export default Saga;
