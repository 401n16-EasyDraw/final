import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addToFavorites, deleteFromFavorites } from '../store/user-slice';
import { resetSearchState } from '../store/recipe-slice';

function RecipeDetails(props) {
  const {
    activeRecipe,
    isLoggedIn,
    favorites,
    addToFavorites,
    deleteFromFavorites,
    favID,
    searching,
    resetSearchState,
  } = props;

  useEffect(() => {
    resetSearchState();
  }, [searching, resetSearchState]);

  const ingredientsToRender = [];

  if (activeRecipe.ingredientLines) {
    activeRecipe.ingredientLines.forEach((ingredient, idx) => {
      ingredientsToRender.push(<li key={`ingrd-${idx}`}>{ingredient}</li>);
    });
  }

  const isInFavorites = () => {
    let res = false;

    for (const item of favorites) {
      if (item.uri === activeRecipe.uri && item.label === activeRecipe.label) {
        res = true;
        break;
      }
    }

    return res;
  };

  return searching ? (
    <Redirect push to="/" />
  ) : isLoggedIn && Object.keys(activeRecipe).length ? (
    <>
      <Link to="/" className="no-style">
        <Button className="m-2" variant="info">
          Back to Homepage
        </Button>
      </Link>
      <Card>
        <Card.Img
          className="img-thumbnail"
          variant="top"
          src={activeRecipe.image}
          style={{ maxHeight: '400px', maxWidth: '400px' }}
        />
        <Card.Body>
          <Card.Title>{activeRecipe.label}</Card.Title>
          <Card.Text>Calories: {parseInt(activeRecipe.calories)}</Card.Text>
          <Card.Text>Ingredients:</Card.Text>
          <ul>{ingredientsToRender}</ul>
          <Card.Text>
            <a href={activeRecipe.url}>
              {' '}
              Cooking Direction: {activeRecipe.url}
            </a>
          </Card.Text>
          <div
            class="fb-share-button"
            data-href={activeRecipe.url}
            data-layout="button_count"
            data-size="large"
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.facebook.com/sharer/sharer.php?u=${activeRecipe.url}`}
              class="fb-xfbml-parse-ignore"
            >
              Share to Facebook
            </a>
          </div>
        </Card.Body>
        <Card.Footer>
          {isInFavorites() ? (
            <Button
              className="btn-block"
              variant="danger"
              onClick={() =>
                deleteFromFavorites({ recipe: activeRecipe, favID })
              }
            >
              Delete from Favorites
            </Button>
          ) : (
            <Button
              className="btn-block"
              onClick={() => addToFavorites({ recipe: activeRecipe, favID })}
            >
              Add to Favorites
            </Button>
          )}
        </Card.Footer>
      </Card>
    </>
  ) : (
    <Redirect push to="/" />
  );
}

const mapStateToProps = (state) => {
  return {
    activeRecipe: state.recipeStore.activeRecipe,
    searching: state.recipeStore.searching,
    isLoggedIn: state.userStore.loggedIn,
    favorites: state.userStore.favorites,
    favID: state.userStore.favID,
  };
};

const mapDispatchToProps = {
  addToFavorites,
  deleteFromFavorites,
  resetSearchState,
};
export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
