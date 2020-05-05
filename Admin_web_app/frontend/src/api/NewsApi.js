import axios from 'axios';

const BASE_URL = ' https://newsapi.org';
const API_KEY = process.env.NEWS_API_KEY;

/**
 * makeRequest: make the call to the News API using axios
 * @function
 * @param {String} path The path suffix can be 'sources' or 'articles'
 * @param {String} lang The language of the sources to render eg. EN, FR
 * @param {String} sourceKey The source id of the news source
 * @param {string} sortBy The sortBy argument to sort the artilces by
 * @returns {Promise} Promise
 */
const makeRequest = (path, lang, sourceKey, sortBy) => {
  let requestUrl = `${BASE_URL}/v1/`;

  if (sourceKey && sortBy) {
    requestUrl += `${path}?source=${sourceKey}&sortBy=${sortBy}&apiKey=${API_KEY}`;
  } else if (lang) {
    requestUrl += `${path}?language=${lang}`;
  }

  return axios.get(requestUrl);
};

/**
 * getSources: retrieves the sources from the API
 * @function
 * @returns {Promise} Promise
 */
export const getSources = () => makeRequest('sources', 'en', undefined, undefined)
  .then(response => response.data.sources)
  .catch(error => error.data);

/**
 * getHeadlines: retrieves the headlines from the API
 * @function
 * @param {String} sourceKey The source id of the news source
 * @param {String} sortBy The sortBy arg to sort by
 * @returns {Promise} Promise
 */
export const getHeadlines =
  (sourceKey, sortBy = 'top') => makeRequest('articles', undefined, sourceKey, sortBy)
    .then(response => response.data.articles)
    .catch(error => error.data);
