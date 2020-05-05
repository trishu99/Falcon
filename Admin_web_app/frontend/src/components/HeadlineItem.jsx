import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image } from 'semantic-ui-react';
import { hashHistory } from 'react-router';

import formatDate from '../helpers/DateFormatter';
import { setArticleUrl } from '../actions/ArticleActions';

/**
 * renders the individual headlines
 * @constructor HeadlineItem
 * @param {string} title The title of the article
 * @param {string} description The article's description
 * @param {string} url The url to the article
 * @param {string} urlToImage The article's image url
 * @param {Date} publishedAt The date article was published
 * @returns {Card} Card
 */
export default function HeadlineItem({ description, publishedAt, title, url, urlToImage }) {
  /**
   * handles the navigation to the Article component
   * @function
   * @memberOf HeadlineItem
   * @param {Object} event The event properties
   * @return {void}
   */
  const onClick = (event) => {
    event.preventDefault();

    // sets the url that's later passed to the getArticle method used for scraping
    setArticleUrl(url);
    hashHistory.push('/article');
  };

  return (
    <Card>
      <Image src={urlToImage} />
      <Card.Content>
        <Card.Header>
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </Card.Header>
        <Card.Meta>
          <span className="date">
            {formatDate(publishedAt)}
          </span>
        </Card.Meta>
        <Card.Description>
          <span dangerouslySetInnerHTML={{ __html: description }} />
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green" onClick={onClick}>Read here</Button>
          <a href={url} target="_blank" rel="noopener noreferrer" className="ui button">
            Go to source
          </a>
        </div>
      </Card.Content>
    </Card>
  );
}

HeadlineItem.propTypes = {
  description: PropTypes.string.isRequired,
  publishedAt: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  urlToImage: PropTypes.string.isRequired
};
