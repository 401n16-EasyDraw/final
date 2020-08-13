import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const recipeSlice = createSlice({
  name: 'recipeStore',

  initialState: {
    searchResults: [],
    query: '',
  },

  reducers: {
    getRecipes: (state, action) => {
      const { payload } = action;
      state.searchResults = payload.searchResults;
      state.query = payload.query;
    },
  },
});

export const { getRecipes } = recipeSlice.actions;

export const searchRecipes = (query) => async (dispatch) => {
  const response = await axios.get(
    `https://api.edamam.com/search?q=${query}&app_id=05546976&app_key=80865f8853944e5a74067e9647dabd80`
  );

  dispatch(getRecipes({ searchResults: response.data.hits, query }));
};

export default recipeSlice.reducer;
