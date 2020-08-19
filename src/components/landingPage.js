import React from 'react';
import auth from './auth';
import Facebook from './facebook';

export const LandingPage = (props) => {
  return (
    <div className="landing">
      <h2>Welcome to the secret page of secured recipes!</h2>
      <Facebook props={props} />
      <img
        // src="https://i.pinimg.com/564x/02/ac/ae/02acaed47cacaa668ba57f18ab86ab80.jpg"
        src="cooking.jpg"
        id="cooking"
        alt=""
      />
    </div>
  );
};
