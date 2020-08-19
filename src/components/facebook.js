import React, { useState } from 'react';
import FacebookLoginWithButton from 'react-facebook-login';
import { Redirect } from 'react-router-dom';
import auth from './auth';

export default function Facebook(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState('');

  const responseFacebook = (response) => {
    if (response.accessToken) {
      setIsLoggedIn(true);
      setUserID(response.userID);
      setName(response.name);
      setEmail(response.email);
      setPicture(
        response && response.picture ? response.picture.data.url : null
      );
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
