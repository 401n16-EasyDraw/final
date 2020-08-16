import recipeReducer, { getRecipes } from '../store/recipe-slice.js';
const sampleData = require('./sample-data.json');

describe('reducer', () => {
  const recipes = [];

  sampleData.hits.forEach((hit) => {
    recipes.push(hit.recipe);
  });

  it('can store an array of hits along with a query with the getRecipes action', () => {
    const newState = recipeReducer(
      {},
      getRecipes({ searchResults: sampleData.hits, query: 'chicken' })
    );
    expect(newState.searchResults).toMatchObject(sampleData.hits);
    expect(newState.query).toBe('chicken');
  });
});
