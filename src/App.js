import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Header from './components/Header';
import Footer from './components/Footer';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/base.scss';

class FoodApp extends React.Component{
  constructor(props){
    super(props);
    this.state={apiResponse:""};

    }
    callAPI(){
      fetch("https://lab12-oauth-linkedin.herokuapp.com/oauth")
      .then(res=>res.text())
      .then(res=>this.setstate({apiResponse:res}));
    }
    componentWillMount(){
      this.callAPI();
    }
  }
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div>{this.state.apiResponse}</div>
        <div id="main-content">
          <Route path="/" exact component={RecipeList} />
          <Route path="/recipes/details" exact component={RecipeDetails} />
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;