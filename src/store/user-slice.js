import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
  name: 'userStore',

  initialState: {
    user: {},
    loggedIn: false,
    favID: '',
    favorites: [],
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
    getFavorites: (state, action) => {
      const { payload } = action;
      state.favID = payload._id;
      state.favorites = payload.list;
    },
  },
});

export const { login, logout, getFavorites } = userSlice.actions;

export const findExistingFavorites = (payload) => async (dispatch) => {
  let response = await axios.get(
    `https://cf-js-401-api-server.herokuapp.com/api/v1/favorites?userID=${payload.userID}`
  );
  // console.log('What the heck is the response?', response.data.results);

  if (response.data.results.length) {
    console.log('Found existing favorite!');
    dispatch(getFavorites(response.data.results[0]));
  } else {
    console.log('No existing favorites! Adding a new favorites object...');
    response = await axios.post(
      `https://cf-js-401-api-server.herokuapp.com/api/v1/favorites`,
      {
        userID: payload.userID,
        list: [],
      }
    );
    dispatch(getFavorites(response.data));
  }
};

export default userSlice.reducer;
