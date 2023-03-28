import { TFieldValue } from 'store/forms/types';

export const getSingleValue = (field: TFieldValue): string => {
  if (!field) return '';
  if (!Array.isArray(field)) return field.toString();
  const first: string | undefined = field[0];
  if (!first) return '';
  return first;
};
