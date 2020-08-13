import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
  // console.log('What is query now?', query);
  const response = await axios.get(
    `https://api.edamam.com/search?q=${query}&app_id=05546976&app_key=80865f8853944e5a74067e9647dabd80`
  );

  console.log('did we get a response?', response.data);
  dispatch(getRecipes(response.data.hits));
};

export default recipeSlice.reducer;
