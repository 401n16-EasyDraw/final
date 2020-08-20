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
      state.user = action.payload;
      state.loggedIn = true;
    },
    logout: (state, action) => {
      state.user = {};
      state.loggedIn = false;
      state.favID = '';
      state.favorites = [];
    },
    getFavorites: (state, action) => {
      const { payload } = action;
      state.favID = payload._id;
      state.favorites = payload.list;
    },
    updateFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const {
  login,
  logout,
  getFavorites,
  updateFavorites,
} = userSlice.actions;

export const findExistingFavorites = (payload) => async (dispatch) => {
  let response = await axios.get(
    `https://cf-js-401-api-server.herokuapp.com/api/v1/favorites?userID=${payload.userID}`
  );

  if (response.data.results.length) {
    dispatch(getFavorites(response.data.results[0]));
  } else {
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

export const addToFavorites = (payload) => async (dispatch) => {
  const { favID, recipe } = payload;
  const response = await axios.get(
    `https://cf-js-401-api-server.herokuapp.com/api/v1/favorites/${favID}`
  );

  let foundRecipe = false;

  for (const item of response.data.list) {
    if (item.uri === recipe.uri && item.label === recipe.label) {
      foundRecipe = true;
      break;
    }
  }

  if (!foundRecipe) {
    const newList = [...response.data.list, payload.recipe];
    await axios.patch(
      `https://cf-js-401-api-server.herokuapp.com/api/v1/favorites/${favID}`,
      { list: newList }
    );

    dispatch(updateFavorites(newList));
  }
};

export const deleteFromFavorites = (payload) => async (dispatch) => {
  const { favID, recipe } = payload;
  const response = await axios.get(
    `https://cf-js-401-api-server.herokuapp.com/api/v1/favorites/${favID}`
  );

  const newList = response.data.list.filter(
    (item) => item.uri !== recipe.uri && item.label !== recipe.label
  );

  await axios.patch(
    `https://cf-js-401-api-server.herokuapp.com/api/v1/favorites/${favID}`,
    { list: newList }
  );

  dispatch(updateFavorites(newList));
};

export default userSlice.reducer;
