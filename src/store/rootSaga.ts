import { all, fork } from 'redux-saga/effects';

import auth from './auth/effects';
import forms from './forms/effects';
import table from './table/effects';
import objects from './objects/effects';
import documents from './documents/effects';
import orders from './orders/effects';

function* Saga(): Generator {
  yield all([
    fork(auth),
    fork(forms),
    fork(table),
    fork(objects),
    fork(documents),
    fork(orders),
  ]);
}

export default Saga;
