import axios from 'axios';

const API_KEY = process.env.MERCURY_API_KEY;
const BASE_URL = 'https://mercury.postlight.com/parser?url=';
const config = {
  headers: {
    'content-type': 'application/json',
    'x-api-key': API_KEY,
  },
};

/**
 * parseArticle: scrapes the news article based on the supplied url
 * @function
 * @param {String} url The url of the article to scrape
 * @returns {Promise} Promise
 */
export default function parseArticle(url) {
  const requestUrl = `${BASE_URL}${url}`;
  return axios.get(requestUrl, config)
    .then(response => response.data)
    .catch(error => error);
}
