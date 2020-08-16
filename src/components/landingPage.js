import React from 'react';
import auth from './auth';
export const LandingPage = props => {
    return (
        <div>
            <h1>Welcome to the secret page of secured recipes</h1>
            <button
                onClick={() => {
                    auth.login(() => {
                        props.history.push("/cook");
                    });
                }}
            >
                Login to Learn More
        </button>
        </div>
    );
};