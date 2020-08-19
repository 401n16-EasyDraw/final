import React from 'react';
import { connect } from 'react-redux';

function Favorites(props) {
  const { favorites, isLoggedIn } = props;
  return <h2>Favorites!</h2>;
}

const mapStateToProps = (state) => {
  return {
    favorites: state.userStore.favorites,
    isLoggedIn: state.userStore.loggedIn,
  };
};

export default connect(mapStateToProps)(Favorites);
