import recipeReducer, {
  getRecipes,
  setActiveRecipe,
  resetRecipeState,
} from '../store/recipe-slice.js';
const sampleData = require('./sample-data.json');

describe('recipe reducer', () => {
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

  it('can change change the activeRecipe with the setActiveRecipe action', () => {
    let newState = recipeReducer(
      {},
      getRecipes({ searchResults: sampleData.hits, query: 'chicken' })
    );

    newState = recipeReducer(newState, setActiveRecipe(recipes[3]));
    expect(newState.activeRecipe).toBe(recipes[3]);

    newState = recipeReducer(newState, setActiveRecipe(recipes[0]));
    expect(newState.activeRecipe).toBe(recipes[0]);

    newState = recipeReducer(newState, setActiveRecipe(recipes[2]));
    expect(newState.activeRecipe).toBe(recipes[2]);
  });

  it('can reset recipe state', () => {
    let newState = recipeReducer(
      {},
      getRecipes({ searchResults: sampleData.hits, query: 'chicken' })
    );
    newState = recipeReducer(newState, setActiveRecipe(recipes[0]));
    newState = recipeReducer(newState, resetRecipeState());

    expect(newState.searchResults).toMatchObject([]);
    expect(newState.query).toBe('');
    expect(newState.activeRecipe).toMatchObject({});
  });
});
