import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';
import { HEADLINES, HEADLINES_ERROR, SOURCE_KEY } from '../constants';

/**
 * Headline Store Class.
 *
 * @class
 * @extends EventEmitter
 */
class HeadlineStore extends EventEmitter {
  /**
   * Creates an instance of HeadlineStore.
   * @constructor
   */
  constructor() {
    super();

    /** @type {Array} */
    this.headlines = [];

    /** @type {string} */
    this.sourceKey = '';

    /** @type {string} */
    this.error = '';
  }

  /**
   * returns all headlines
   * @method
   * @memberOf HeadlineStore
   * @returns {Array} headlines
   */
  getHeadlines() {
    return this.headlines;
  }

  /**
   * returns error
   * @method
   * @memberOf HeadlineStore
   * @returns {String} error
   */
  getError() {
    return this.error;
  }

  /**
   * returns all sources
   * @method
   * @memberOf HeadlineStore
   * @returns {string} sourceKey
   */
  getSourceKey() {
    return this.sourceKey;
  }

  /**
   * assigns headlines and emits an event
   * @method
   * @memberOf HeadlineStore
   * @param {Array} headlines The headlines fetched for a given source
   * @returns {void}
   */
  setHeadlines(headlines) {
    this.headlines = headlines;
    this.emit('headline_change');
  }

  /**
   * assigns error and emits an event
   * @method
   * @memberOf HeadlineStore
   * @param {string} error Error that occur while fetching data if any
   * @returns {void}
   */
  setError(error) {
    this.error = error;
    this.emit('headline_error');
  }

  /**
   * sets the sourceKey
   * @method
   * @memberOf HeadlineStore
   * @param {string} sourceKey The news source id
   * @returns {void}
   */
  setSourceKey(sourceKey) {
    this.sourceKey = sourceKey;
    localStorage.setItem('sourceKey', sourceKey);
  }

  /**
   * switches between actions and handle them accordingly
   * @method
   * @memberOf HeadlineStore
   * @param {Object} action The action type dispatched
   * @returns {void}
   */
  handleActions(action) {
    switch (action.type) {
      case HEADLINES:
        this.setHeadlines(action.headlines);
        break;
      case HEADLINES_ERROR:
        this.setError(action.error);
        break;
      case SOURCE_KEY:
        this.setSourceKey(action.sourceKey);
        break;

      default: break;
    }
  }
}

const headlineStore = new HeadlineStore();
dispatcher.register(headlineStore.handleActions.bind(headlineStore));
export default headlineStore;
