
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './user/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
