import React, { useState } from 'react';
import { connect } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
import { Card, CardDeck, Button, Col } from 'react-bootstrap';
import axios from 'axios';

function RecipeList(props) {
  const { searchResults } = props;
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
            <Card.Text>View Details</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button>Save to Favorites</Button>
          </Card.Footer>
        </Card>
      </Col>
    );
  });

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <CardDeck>{recipesToRender}</CardDeck>
  );
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.recipeStore.searchResults,
  };
};

export default connect(mapStateToProps)(RecipeList);
