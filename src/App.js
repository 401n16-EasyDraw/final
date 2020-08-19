import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Header from './components/Header';
import Footer from './components/Footer';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/base.scss';
import { LandingPage } from './components/landingPage';
import { ProtectedRoute } from './components/protected.route';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div id="main-content">
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <ProtectedRoute path="/cook" exact component={RecipeList} />
            <Route path="/recipes/details" exact component={RecipeDetails} />
            <Route path="*" component={() => '404 NOT FOUND'} />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
