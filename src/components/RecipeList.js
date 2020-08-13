import React from 'react';
import { connect } from 'react-redux';
import { Card, CardDeck, Button, Col } from 'react-bootstrap';

function RecipeList(props) {
  const { searchResults } = props;
  const recipesToRender = [];

  searchResults.forEach((hit, i) => {
    const { recipe } = hit;

    recipesToRender.push(
      <Col item xs={12} md={6} xl={3} key={i}>
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

  return <CardDeck>{recipesToRender}</CardDeck>;
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.recipeStore.searchResults,
  };
};

export default connect(mapStateToProps)(RecipeList);
