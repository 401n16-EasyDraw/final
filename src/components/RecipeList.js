import React, { useState } from 'react';
import { connect } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
import { Card, CardDeck, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setActiveRecipe } from '../store/recipe-slice.js';

function RecipeList(props) {
  const { searchResults, setActiveRecipe, query } = props;
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
            <Button className="btn-block">Save to Favorites</Button>
          </Card.Footer>
        </Card>
      </Col>
    );
  });

  return isLoading ? (
    <LoadingSpinner />
  ) : recipesToRender.length ? (
    <CardDeck>{recipesToRender}</CardDeck>
  ) : (
        <>
          <h2>{query ? 'Let\'s start cooking!' : 'Nothing to display! :('}</h2>
          <p>Search for recipes with the search bar above!</p>
        </>
      );
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.recipeStore.searchResults,
    query: state.recipeStore.query
  };
};

const mapDispatchToProps = {
  setActiveRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
