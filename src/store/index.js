import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import recipeSlice from './recipe-slice.js';
import userSlice from './user-slice.js';
// import productSlice from './product-slice.js';
// import categorySlice from './category-slice.js';
// import { enableMapSet } from 'immer';
// enableMapSet();

// const customSettings = getDefaultMiddleware({
//   serializableCheck: false,
// });

const reducers = combineReducers({
  recipeStore: recipeSlice,
  userStore: userSlice,
});

const store = configureStore({
  reducer: reducers,
  // middleware: customSettings
});

export default store;
