import { ObjectShape } from 'yup/lib/object';

import { numberYup, stringYupRequired } from 'utils/validation/index';

export const schemaCreateOrder: ObjectShape = {
  number: numberYup,
  description: stringYupRequired,
};
