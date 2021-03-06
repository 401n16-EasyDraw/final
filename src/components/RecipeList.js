import React, { useState } from 'react';
import { connect } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
import { Card, CardDeck, Button, Col } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { setActiveRecipe } from '../store/recipe-slice.js';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { searchRecipes } from '../store/recipe-slice';
import { addToFavorites, deleteFromFavorites } from '../store/user-slice';

function RecipeList(props) {
  const {
    searchResults,
    setActiveRecipe,
    query,
    searchRecipes,
    isLoggedIn,
    addToFavorites,
    deleteFromFavorites,
    favorites,
    favID,
  } = props;
  const recipesToRender = [];
  const [isLoading, setIsLoading] = useState(false);

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

  const isInFavorites = (recipe, favorites) => {
    let res = false;

    for (const item of favorites) {
      if (item.uri === recipe.uri && item.label === recipe.label) {
        res = true;
        break;
      }
    }

    return res;
  };

  searchResults.forEach((hit, i) => {
    const { recipe } = hit;

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
            {isInFavorites(recipe, favorites) ? (
              <Button
                className="btn-block"
                variant="danger"
                onClick={() => deleteFromFavorites({ recipe, favID })}
              >
                Delete from Favorites
              </Button>
            ) : (
              <Button
                className="btn-block"
                onClick={() => addToFavorites({ recipe, favID })}
              >
                Add to Favorites
              </Button>
            )}
          </Card.Footer>
        </Card>
      </Col>
    );
  });

  return !isLoggedIn ? (
    <Redirect push to="/" />
  ) : isLoading ? (
    <LoadingSpinner />
  ) : recipesToRender.length ? (
    <>
      <h2>Search Results</h2>
      <CardDeck>{recipesToRender}</CardDeck>
    </>
  ) : (
    <>
      <h2 className="italic">
        {query ? 'Nothing to display! :(' : "Let's start cooking!"}
      </h2>
      <p>Search for recipes with the search bar above!</p>
      <hr className="dotted-line" />
      <div className="mt-5">
        <p> Suggested Categories: </p>
        <MDBContainer className="mt-2">
          <MDBRow>
            <MDBCol lg="4" md="12" className="mb-4 text-center">
              <Button
                className="mb-3"
                variant="success"
                onClick={() => searchRecipes('salad')}
              >
                Salad
              </Button>
              <img
                src="https://natashaskitchen.com/wp-content/uploads/2019/02/Greek-Salad-600x900.jpg"
                className="img-fluid z-depth-1"
                alt=""
              />
            </MDBCol>
            <MDBCol lg="4" md="6" className="mb-4 text-center">
              <Button
                className="mb-3"
                variant="success"
                onClick={() => searchRecipes('detox')}
              >
                Detox Juice
              </Button>
              <img
                src="https://i.pinimg.com/564x/5e/b7/7c/5eb77c0036e60a20503bb306d43debf6.jpg"
                className="img-fluid z-depth-1-half"
                alt=""
              />
            </MDBCol>
            <MDBCol lg="4" md="6" className="mb-4 text-center">
              <Button
                className="mb-3"
                variant="success"
                onClick={() => searchRecipes('salmon')}
              >
                Salmon
              </Button>
              <img
                src="https://www.cookingclassy.com/wp-content/uploads/2017/02/skillet-seared-salmon-2.jpg"
                className="img-fluid z-depth-2"
                alt=""
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.recipeStore.searchResults,
    query: state.recipeStore.query,
    isLoggedIn: state.userStore.loggedIn,
    favorites: state.userStore.favorites,
    favID: state.userStore.favID,
  };
};

const mapDispatchToProps = {
  setActiveRecipe,
  searchRecipes,
  addToFavorites,
  deleteFromFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
