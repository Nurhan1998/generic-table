import get from 'lodash/get';
import isBoolean from 'lodash/isBoolean';

const safeGet = <T, R> (object: T, path: string, defaultValue?: R): R => {
  const result = get(object, path, defaultValue);

  if (isBoolean(result) || result == 0) return result;
  return result || defaultValue;
};

export default safeGet;
