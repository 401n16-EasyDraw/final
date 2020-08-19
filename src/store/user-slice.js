import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userStore',

  initialState: {
    user: {},
    loggedIn: false,
  },

  reducers: {
    login: (state, action) => {
      const { payload } = action;
      state.user = payload;
      state.loggedIn = true;
    },
    logout: (state, action) => {
      state.user = {};
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
