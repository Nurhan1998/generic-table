import { combineReducers } from 'redux';

import { IAppState } from './types';
import auth from './auth/store';
import forms from './forms/store';
import table from './table/store';
import objects from './objects/store';


const rootReducer = combineReducers<IAppState>({
  auth,
  forms,
  table,
  objects
});

export default rootReducer;
