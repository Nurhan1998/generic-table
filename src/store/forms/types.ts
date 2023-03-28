import { RecordOf } from 'immutable';
import { ObjectShape } from 'yup/lib/object';

import { IConfig } from 'components/Form/types';

import { THandler, TSelectorReturnType } from 'store/types';


export type TFieldValue<T = string> = T | Array<T>;
export interface IFormItem<T = string> {
  value: TFieldValue<T>,
  isTouched: boolean
}
export type TFormattedFormValues = Record<string, string | string[]>;
export type TFormValues = Record<string, IFormItem>;
export interface IFormMeta {
  config: Array<IConfig>;
  isValid?: boolean;
  isTouched?: boolean;
  loading?: boolean;
  title?: string;
  subTitle?: string;
}

export interface IFormState {
  _META: IFormMeta;
  values: IFormItem;
}

export interface IFormPayload {
  form: string;
}

export interface IInitFormAction extends IFormPayload {
  config: Array<IConfig>;
  initials?: Record<string, TFieldValue | undefined>;
}

export interface ISetFieldValueAction extends IFormPayload {
  field: string;
  value: TFieldValue;
  validateSchema?: ObjectShape;
}

export interface ISetFieldErrorAction extends IFormPayload {
  error: Record<string, string[]> | null;
}

export interface ISetIsTouchedAction extends IFormPayload {
  field: string;
  isTouched: boolean;
}

export interface ISetInitValuesFormAction extends IFormPayload {
  instance: Record<string, TFieldValue | undefined>;
}

export interface ISetFormLoadingAction extends IFormPayload {
  value: boolean;
}

export type TFormSelectorReturnType<T> = TSelectorReturnType<T, TFormState>;
export type TRecordOfFormState = RecordOf<IFormState>;
export type TFormState = RecordOf<Record<string, TRecordOfFormState>>;
export type TFormStateHandler<T> = THandler<TFormState, T>;

