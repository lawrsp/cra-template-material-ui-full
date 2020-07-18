import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'account',
  initialState: {},
  reducers: {
    loginSucceed(_, { payload }) {
      return payload;
    },
    logout() {
      return {};
    },
  },
});

const { actions, reducer } = accountSlice;
export const { loginSucceed, logout } = actions;

export default reducer;
