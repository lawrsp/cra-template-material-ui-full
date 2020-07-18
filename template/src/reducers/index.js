import { combineReducers } from '@reduxjs/toolkit';
import account, { logout } from './account';

const appReducer = combineReducers({
  account
});

const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
