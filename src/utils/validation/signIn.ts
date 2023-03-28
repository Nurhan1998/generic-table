import { ObjectShape } from 'yup/lib/object';

import { stringRequiredWithEmail, stringYupPassword } from 'utils/validation/index';

export const schema: ObjectShape = {
  email: stringRequiredWithEmail,
  password: stringYupPassword,
};

