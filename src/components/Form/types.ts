import { ObjectShape } from 'yup/lib/object';

import { TFormattedFormValues, TFieldValue } from 'store/forms/types';

import { ISelectOption } from '../Select/types';

export enum EFieldType {
  TEXT,
  TEXTAREA,
  SELECT,
  CHECKBOX
}

export enum ESelectType {
  RAW_SELECT,
  VALUE_SET,
}

export enum EFormOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export interface IConfig {
  name: string;
  type: EFieldType;
  selectType?: ESelectType;
  rawData?: Array<ISelectOption>;
  multiple?: boolean;
  inputType?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  showIf?: (formValues: TFormattedFormValues) => boolean;
  disabledIf?: (formValues: TFormattedFormValues) => boolean;
  className?: string;
  required?: boolean;
  renderChipValue?: (value: TFieldValue) => string;
  rows?: number;
}

export interface IFormProps {
  disabled?: boolean;
  name: string;
  config: Array<IConfig>;
  className?: string;
  loading?: boolean;
  orientation?: EFormOrientation;
  actionsAnchor?: HTMLElement;
  validateSchema?: ObjectShape;
  outsideInitialization?: boolean;
  initials?: Record<string, TFieldValue | undefined>;
  onFieldValueChange?: (field: string, value: TFieldValue) => void;
}
