import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

/**
 * Login Store Class.
 *
 * @class
 * @extends EventEmitter
 */
class LoginStore extends EventEmitter {
  /**
   * @description Creates an instance of LoginStore.
   * @memberOf LoginStore
   * @constructor
   */
  constructor() {
    super();

    /** @type {Object} */
    this.user = {};

    /** @type {string} */
    this.userId = '';
  }

  /**
   * @description returns userId
   * @method
   * @memberOf LoginStore
   * @param {string} userId The currently logged in user's id
   * @returns {string} userId
   */
  getUserId(userId) {
    this.userId = userId;
    return this.userId;
  }

  /**
   * @description sets the user
   * @method
   * @memberOf LoginStore
   * @param {Object} user The currently logged in user
   * @returns {void}
   */
  setUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * @description clears user's data and localStorage on logout
   * @method
   * @memberOf LoginStore
   * @returns {void}
   */
  clearAll() {
    this.userId = '';
    this.user = {};
    localStorage.removeItem('user');
    localStorage.removeItem('sourceKey');
  }

  /**
   * @description switches between actions and handle them accordingly
   * @method
   * @memberOf LoginStore
   * @param {Object} action The action type dispatched
   * @returns {void}
   */
  handleActions(action) {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        this.getUserId(action.user.uid);
        this.setUser(action.user);
        break;
      case 'LOGOUT_SUCCESS':
        this.clearAll();
        break;

      default: break;
    }
  }
}

const loginStore = new LoginStore();
dispatcher.register(loginStore.handleActions.bind(loginStore));
export default loginStore;
