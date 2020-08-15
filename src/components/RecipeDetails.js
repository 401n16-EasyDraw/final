import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, CardDeck, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function RecipeDetails(props) {
  const { activeRecipe } = props;
  const ingredientsToRender = [];

  if (activeRecipe.ingredientLines) {
    activeRecipe.ingredientLines.forEach((ingredient, idx) => {
      ingredientsToRender.push(<p key={`ingrd-${idx}`}>{ingredient}</p>);
    });
  }

  return Object.keys(activeRecipe).length ? (
    <>
      <Link to="/" className="no-style">
        <Button className="m-2" variant="info">
          Back to Homepage
                </Button>
      </Link>
      <Card>
        <Card.Img variant="top" src={activeRecipe.image} />
        <Card.Body>
          <Card.Title>{activeRecipe.label}</Card.Title>
          <Card.Text>Source: {activeRecipe.source}</Card.Text>
          <Card.Text>
            {ingredientsToRender}
          </Card.Text>
          <Card.Text>
            <a href={activeRecipe.url}> Cooking Direction: {activeRecipe.url}</a>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button className="btn-block">Save to Favorites</Button>
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
  };
};

export default connect(mapStateToProps)(RecipeDetails);
