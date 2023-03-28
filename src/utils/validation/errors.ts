import { ValidationError } from 'yup';

export const getValidationErrors = (
  errors: ValidationError
): Record<string, string[]> => errors.inner
  .reduce((errors, currentValidation) => {
    if (!currentValidation.path) return errors;
    return Object.assign(errors, {
      [currentValidation.path]: currentValidation.errors,
    });
  }, {});

