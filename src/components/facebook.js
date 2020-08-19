import React from 'react';
import { connect } from 'react-redux';
import FacebookLoginWithButton from 'react-facebook-login';
import { Redirect } from 'react-router-dom';
import { login, logout } from '../store/user-slice';

function Facebook(props) {
  const { isLoggedIn, login } = props;

  const responseFacebook = (response) => {
    if (response.accessToken) {
      login({
        userID: response.userID,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url,
      });
    } else {
      console.error('error: failed to login');
    }

    console.log('What is response?', response);
  };

  const componentClicked = () => console.log('clicked');

  const fbContent = isLoggedIn ? (
    <Redirect push to="/cook" />
  ) : (
    <FacebookLoginWithButton
      appId="3053710821394859"
      autoLoad={true}
      fields="name,email,picture"
      onClick={componentClicked}
      callback={responseFacebook}
      icon="fa-facebook"
    />
  );

  return <div>{fbContent}</div>;
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userStore.loggedIn,
  };
};

const mapDispatchToProps = { login, logout };

export default connect(mapStateToProps, mapDispatchToProps)(Facebook);
