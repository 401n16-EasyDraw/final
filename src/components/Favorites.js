import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CardDeck, Col, Card, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { searchRecipes, setActiveRecipe } from '../store/recipe-slice';
import { deleteFromFavorites } from '../store/user-slice';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';

function Favorites(props) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    favorites,
    isLoggedIn,
    setActiveRecipe,
    favID,
    searching,
    deleteFromFavorites,
  } = props;

  const recipesToRender = [];

  axios.interceptors.request.use(
    function (config) {
      setIsLoading(true);
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      setIsLoading(false);
      return response;
    },
    function (error) {
      setIsLoading(false);
      return Promise.reject(error);
    }
  );

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
            <Button
              className="btn-block"
              variant="danger"
              onClick={() => deleteFromFavorites({ recipe, favID })}
            >
              Delete from Favorites
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    );
  });

  return searching || !isLoggedIn ? (
    <Redirect push to="/" />
  ) : isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <h2>My Favorites</h2>
      {recipesToRender.length ? (
        <CardDeck>{recipesToRender}</CardDeck>
      ) : (
        <h3>
          No favorites! Please return to the home page or enter a query in the
          search bar to add recipes to your favorites.
        </h3>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    favorites: state.userStore.favorites,
    searching: state.recipeStore.searching,
    favID: state.userStore.favID,
    isLoggedIn: state.userStore.loggedIn,
  };
};

const mapDispatchToProps = {
  setActiveRecipe,
  searchRecipes,
  deleteFromFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
