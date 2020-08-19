import React from 'react';
import { mount } from 'enzyme';
import Header from '../components/Header';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';

describe('header component', () => {
  it('displays the proper html and text on render', () => {
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();

    const h1Tag = component.find('h1');
    expect(h1Tag).toBeDefined();
    expect(h1Tag.text()).toBe('EasyCook');
  });
});
