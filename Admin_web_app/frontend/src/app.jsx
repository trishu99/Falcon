import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import 'font-awesome/scss/font-awesome.scss';

import firebase from './firebase/';
import router from './router/';
import './styles/app.scss';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    hashHistory.push('/headlines');
  }

  hashHistory.push('/');
});

render(
  router,
  document.querySelector('#app'),
);
