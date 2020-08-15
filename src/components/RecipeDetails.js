import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

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
      <h2>{activeRecipe.label}</h2>
      <p>Source: {activeRecipe.source}</p>
      <div>{ingredientsToRender}</div>
    </>
  ) : null;
}

const mapStateToProps = (state) => {
  return {
    activeRecipe: state.recipeStore.activeRecipe,
  };
};

export default connect(mapStateToProps)(RecipeDetails);
