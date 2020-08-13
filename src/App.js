import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Header from './components/Header';
import Footer from './components/Footer';
import RecipeList from './components/RecipeList';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/base.scss';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div id="main-content">
          <RecipeList />
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
