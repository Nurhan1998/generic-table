import * as yup from 'yup';
import { ObjectShape } from 'yup/lib/object';

import { stringRequiredWithEmail, stringYup, stringYupPassword } from 'utils/validation/index';

export const schema: ObjectShape = {
  email: stringRequiredWithEmail,
  password: stringYupPassword,
  confirm_password: stringYup.oneOf([yup.ref('password'), null], 'Passwords didn\'t match')
};


