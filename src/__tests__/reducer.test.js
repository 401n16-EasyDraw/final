import recipeReducer, {
  getRecipes,
  setActiveRecipe,
  resetRecipeState,
  setSearchState,
} from '../store/recipe-slice.js';
import userReducer, {
  login,
  logout,
  getFavorites,
  updateFavorites,
} from '../store/user-slice.js';
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

    expect(newState.searching).toBe(false);
    expect(newState.searchResults).toMatchObject([]);
    expect(newState.query).toBe('');
    expect(newState.activeRecipe).toMatchObject({});
  });

  it('can alternate between true and false for searching state', () => {
    let newState = recipeReducer({}, setSearchState(false));
    expect(newState.searching).toBe(false);

    newState = recipeReducer(newState, setSearchState(true));
    expect(newState.searching).toBe(true);
  });
});

describe('user reducer', () => {
  const testUser = {
    userID: '123456',
    name: 'Bob Saget',
    email: 'test@test.com',
    picture: 'https://via.placeholder.com/300/09f/fff.png',
  };

  it('can login and logout', () => {
    let newState = userReducer({}, login(testUser));

    expect(newState.user).toMatchObject(testUser);
    expect(newState.loggedIn).toBe(true);

    newState = userReducer(newState, logout());
    expect(newState.user).toMatchObject({});
    expect(newState.loggedIn).toBe(false);
    expect(newState.favID).toBe('');
    expect(newState.favorites).toMatchObject([]);
  });

  it('can get and update favorites', () => {
    const payload = {
      _id: 'abc123',
      list: [
        sampleData.hits[0].recipe,
        sampleData.hits[2].recipe,
        sampleData.hits[4].recipe,
      ],
    };

    let newState = userReducer({}, getFavorites(payload));
    expect(newState.favID).toBe(payload._id);
    expect(newState.favorites).toMatchObject(payload.list);

    const newFavorites = [sampleData.hits[1].recipe, sampleData.hits[3].recipe];
    newState = userReducer(newState, updateFavorites(newFavorites));
    expect(newState.favorites).toMatchObject(newFavorites);
  });
});
