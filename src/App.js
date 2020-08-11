import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/base.scss';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div id="main-content">
        <h1>Check this stuff out!</h1>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
