import React from 'react';
import { connect } from 'react-redux';
// import { searchRecipes } from '../store/recipe-slice';
import { Card, CardDeck, Button } from 'react-bootstrap';

function RecipeList(props) {
  const { searchResults } = props;
  const recipesToRender = [];

  searchResults.forEach((hit, i) => {
    const { recipe } = hit;

    recipesToRender.push(
      <Card key={i}>
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
    );
  });

  return <CardDeck>{recipesToRender}</CardDeck>;
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.recipeStore.searchResults,
  };
};

export default connect(mapStateToProps)(RecipeList);
