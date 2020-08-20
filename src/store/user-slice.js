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
      state.favID = '';
      state.favorites = [];
    },
    getFavorites: (state, action) => {
      const { payload } = action;
      state.favID = payload._id;
      state.favorites = payload.list;
    },
    updateFavorites: (state, action) => {
      const { payload } = action;
      state.favorites = payload;
      console.log('What are favorites now?', state.favorites);
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
  console.log('Did this even triger?');
  const { favID, recipe } = payload;
  const response = await axios.get(
    `https://cf-js-401-api-server.herokuapp.com/api/v1/favorites/${favID}`
  );

  const newList = response.data.list.filter(
    (item) => item.uri !== recipe.uri && item.label !== recipe.label
  );

  console.log('What is filtered list?', newList);
  await axios.patch(
    `https://cf-js-401-api-server.herokuapp.com/api/v1/favorites/${favID}`,
    { list: newList }
  );

  dispatch(updateFavorites(newList));
};

export default userSlice.reducer;
