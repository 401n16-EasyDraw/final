import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
require('dotenv').config();

const recipeSlice = createSlice({
  name: 'recipeStore',

  initialState: {
    recipes: [],
    query: '',
  },

  reducers: {
    getRecipes: (state, action) => {
      const { payload } = action;
      state.recipes = payload.results;
      state.query = payload.query;
    },
  },
});

export const { getRecipes } = recipeSlice.actions;

export const searchRecipes = (query) => async (dispatch) => {
  const response = await axios.get(
    `https://api.edamam.com/search?q=${query}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`
  );

  dispatch(getRecipes(response.data.results));
};
