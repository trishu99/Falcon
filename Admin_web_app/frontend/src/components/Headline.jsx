import React from 'react';
import { Card, Dimmer, Loader } from 'semantic-ui-react';

import loadHeadlines from '../actions/HeadlineActions';
import HeadlineItem from './HeadlineItem.jsx';
import HeadlineStore from '../stores/HeadlineStore';

/**
 * @class Headline
 * @extends React.Component
 */
export default class Headline extends React.Component {
  /**
   * Creates an instance of Headline
   * @memberOf Headline
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.setHeadlines = this.setHeadlines.bind(this);
    this.setError = this.setError.bind(this);
    this.renderHeadlines = this.renderHeadlines.bind(this);

    /** @type {string} */
    this.sourceKey = HeadlineStore.getSourceKey() || localStorage.getItem('sourceKey');

    this.state = {
      error: '',
      headlines: null,
    };
  }

  /**
   * componentDidMount
   * @method
   * @memberOf Headline
   * @returns {void}
   */
  componentDidMount() {
    loadHeadlines(this.sourceKey);
    HeadlineStore.on('headline_change', this.setHeadlines);
    HeadlineStore.on('headline_error', this.setError);
  }

  /**
   * componentWillUnmount
   * @method
   * @memberOf Headline
   * @returns {void}
   */
  componentWillUnmount() {
    HeadlineStore.removeListener('headline_change', this.setHeadlines);
    HeadlineStore.removeListener('headline_error', this.setError);
  }

  /**
   * sets the state with the fetched headlines.
   * @method
   * @memberOf Headline
   * @returns {void}
   */
  setHeadlines() {
    this.setState({
      headlines: HeadlineStore.getHeadlines(),
    });
  }

  /**
   * sets the error state if an error occurred.
   * @method
   * @memberOf Headline
   * @returns {void}
   */
  setError() {
    this.setState({
      error: HeadlineStore.getError()
    });
  }

  /**
   * returns an array of HeadlineItem component.
   * @method
   * @memberOf Headline
   * @param {Array} headlines - array of headlines to be mapped over
   * @returns {Array} HeadlineItem
   */
  renderHeadlines(headlines) {
    return headlines.map(article => <HeadlineItem key={article.url} {...article} />);
  }

  /**
   * renders the Headlines
   * @method
   * @memberOf Headline
   * @returns {Card} Card
   */
  render() {
    const { error, headlines } = this.state;

    return (
      <div>
        {error ? <div>{error}</div> : undefined}

        {
          headlines ? <Card.Group>{this.renderHeadlines(headlines)}</Card.Group>
            : (
              <Dimmer active inverted>
                <Loader size="large" inline="centered">Loading...</Loader>
              </Dimmer>
          )
        }
      </div>
    );
  }
}
