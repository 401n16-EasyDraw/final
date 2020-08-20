import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const recipeSlice = createSlice({
  name: 'recipeStore',

  initialState: {
    searching: false,
    searchResults: [],
    query: '',
    activeRecipe: {},
  },

  reducers: {
    getRecipes: (state, action) => {
      const { payload } = action;
      state.searchResults = payload.searchResults;
      state.searching = false;
      state.query = payload.query;
    },
    setActiveRecipe: (state, action) => {
      state.activeRecipe = action.payload;
    },
    resetRecipeState: (state, action) => {
      state.searchResults = [];
      state.query = '';
      state.activeRecipe = {};
      state.searching = false;
    },
    setSearchState: (state, action) => {
      state.searching = action.payload;
    },
  },
});

export const {
  getRecipes,
  setActiveRecipe,
  resetRecipeState,
  setSearchState,
} = recipeSlice.actions;

export const searchRecipes = (query) => async (dispatch) => {
  const response = await axios.get(
    `https://api.edamam.com/search?q=${query}&app_id=05546976&app_key=80865f8853944e5a74067e9647dabd80`
  );

  dispatch(getRecipes({ searchResults: response.data.hits, query }));
};

export default recipeSlice.reducer;
