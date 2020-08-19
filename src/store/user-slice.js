import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userStore',

  initialState: {
    user: {},
    isLoggedIn: false,
  },

  reducers: {
    login: (state, action) => {
      const { payload } = action;
      state.user = payload;
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.user = {};
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
