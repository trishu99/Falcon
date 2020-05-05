import dispatcher from '../dispatcher';
import parseArticle from '../api/MercuryApi';

/**
 * getArticle: function for article scraping.
 * @function
 * @param {String} url The url of the article to scrape.
 * @returns {Promise} Promise
 */
export default function getArticle(url) {
  return parseArticle(url).then((article) => {
    dispatcher.dispatch({
      type: 'RECEIVE_ARTICLE',
      article,
    });
  }, (error) => {
    dispatcher.dispatch({
      type: 'RECEIVE_ARTICLE_ERROR',
      error,
    });
  });
}

/**
 * setArticleUrl: sets the url for the getArticle function
 * @function
 * @param {String} url The url of the article
 * @returns {void}
 */
export function setArticleUrl(url) {
  dispatcher.dispatch({
    type: 'ARTICLE_URL',
    url
  });
}
