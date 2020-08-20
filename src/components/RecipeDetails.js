import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addToFavorites, deleteFromFavorites } from '../store/user-slice';

function RecipeDetails(props) {
  const {
    activeRecipe,
    isLoggedIn,
    favorites,
    addToFavorites,
    deleteFromFavorites,
    favID,
  } = props;
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

  return isLoggedIn && Object.keys(activeRecipe).length ? (
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
    isLoggedIn: state.userStore.loggedIn,
    favorites: state.userStore.favorites,
    favID: state.userStore.favID,
  };
};

const mapDispatchToProps = {
  addToFavorites,
  deleteFromFavorites,
};
export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
