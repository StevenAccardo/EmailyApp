//Primary location for starting redux and also renders our root component to the DOM

import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import axios from 'axios';
window.axios = axios;
//sets up the Redux store
//links all of the reducers to the store by importing the reducer/index.js file which imports all of the reducers.
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//Provider is a React component that knows when the store has changed, whenenver there is a state change in the store, the provider will notify all of it's children components.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
