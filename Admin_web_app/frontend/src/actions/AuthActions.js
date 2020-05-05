import dispatcher from '../dispatcher';
import firebase from '../firebase/index';

/**
 * authenticate: initiates the auth process with firebase.
 * @function
 * @param {Object} authProvider The type of authentication provider to use
 * @returns {void}
 */
function authenticate(authProvider) {
  firebase.auth()
    .signInWithPopup(authProvider)
    .then((result) => {
      dispatcher.dispatch({
        type: 'LOGIN_SUCCESS',
        user: result.user,
      });
    }, (error) => {
      dispatcher.dispatch({
        type: 'LOGIN_FAILURE',
        error,
      });
    });
}

/**
 * startLogin: calls authenticate() to initiate the sign in process.
 * @function
 * @param {Object} authProvider The type of authentication provider to use
 * @returns {void}
 */
export const startLogin = authProvider => authenticate(authProvider);

/**
 * startLogout: initiates the sign out process.
 * @function
 * @returns {void}
 */
export const startLogout = () => firebase.auth()
  .signOut()
    .then(() => {
      dispatcher.dispatch({
        type: 'LOGOUT_SUCCESS',
      });
    });
