import dispatcher from '../dispatcher';
import { getSources } from '../api/NewsApi';
import { SOURCES, SOURCES_ERROR } from '../constants';

/**
 * loadSources: retrieves sources.
 * @function
 * @returns {Promise} Promise
 */
export default function loadSources() {
  return getSources()
    .then((sources) => {
      dispatcher.dispatch({
        type: SOURCES,
        sources,
      });
    })
    .catch((error) => {
      dispatcher.dispatch({
        type: SOURCES_ERROR,
        error,
      });
    });
}
