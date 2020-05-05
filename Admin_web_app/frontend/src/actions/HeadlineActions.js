import dispatcher from '../dispatcher';
import { getHeadlines } from '../api/NewsApi';
import { HEADLINES, HEADLINES_ERROR, SOURCE_KEY } from '../constants';

/**
 * loadHeadlines: retrieves headlines based on supplied source id and sort.
 * @function
 * @param {String} sourceKey The source key for the headlines to fetch.
 * @param {String} sortBy The sort arg to filter the headlines.
 * @returns {Promise} Promise
 */
export default function loadHeadlines(sourceKey, sortBy = 'top') {
  return getHeadlines(sourceKey, sortBy)
    .then((headlines) => {
      dispatcher.dispatch({
        type: HEADLINES,
        headlines,
      });
    })
    .catch((error) => {
      dispatcher.dispatch({
        type: HEADLINES_ERROR,
        error,
      });
    });
}

/**
 * setSourceKey: sets the initial news source
 * @function
 * @param {String} sourceKey The sourceKey (source id) of the selected source
 * @returns {void}
 */
export function setSourceKey(sourceKey) {
  dispatcher.dispatch({
    type: SOURCE_KEY,
    sourceKey,
  });
}
