import React from 'react';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';

import App from '../components/App.jsx';
import Article from '../components/Article.jsx';
import firebase from '../firebase/index';
import Login from '../components/Login.jsx';

/**
 * requireLogin: checks for a currently logged in user
 * @function
 * @param {string} nextState The next state
 * @param {string} replace Navigates the app
 * @param {string} next Allows continuation
 * @returns {void}
 */
const requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/');
  }
  next();
};

/**
 * redirectIfLogged: redirect a user if there's a currently logged in user
 * @function
 * @param {string} nextState The next state
 * @param {string} replace Navigates the app
 * @param {string} next Allows continuation
 * @returns {void}
 */
const redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/headlines');
  }
  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="headlines" component={App} onEnter={requireLogin} />
      <Route path="article" component={Article} onEnter={requireLogin} />
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn} />
    </Route>
  </Router>
);
