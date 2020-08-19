import React from 'react';
import { connect } from 'react-redux';
import { CardDeck, Col, Card, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { searchRecipes, setActiveRecipe } from '../store/recipe-slice';
import { addToFavorites, logout } from '../store/user-slice';

function Favorites(props) {
  const { favorites, isLoggedIn, setActiveRecipe } = props;
  const recipesToRender = [];

  favorites.forEach((recipe, i) => {
    recipesToRender.push(
      <Col className="mb-4" xs={12} md={6} lg={4} xl={3} key={i}>
        <Card>
          <Card.Img variant="top" src={recipe.image} />
          <Card.Body>
            <Card.Title>{recipe.label}</Card.Title>
            <Card.Text>Source: {recipe.source}</Card.Text>
            <Card.Text
              onClick={(e) => {
                setActiveRecipe(recipe);
              }}
            >
              <Link to={`/recipes/details`} className="no-style">
                <Button className="btn-block" variant="info">
                  View Details
                </Button>
              </Link>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button className="btn-block" variant="danger" onClick={() => {}}>
              Delete from Favorites
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    );
  });

  return isLoggedIn ? (
    <>
      <h2>My Favorites</h2>
      <CardDeck>{recipesToRender}</CardDeck>
    </>
  ) : (
    <Redirect push to="/" />
  );
}

const mapStateToProps = (state) => {
  return {
    favorites: state.userStore.favorites,
    isLoggedIn: state.userStore.loggedIn,
  };
};

const mapDispatchToProps = {
  setActiveRecipe,
  searchRecipes,
  logout,
  addToFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
