import React, { Component } from 'react';
import AlertContainer from 'react-alert';
import { hashHistory } from 'react-router';
import { Button, Container, Dimmer, Divider, Header, Loader, Segment } from 'semantic-ui-react';

import ArticleStore from '../stores/ArticleStore';
import getArticle from '../actions/ArticleActions';
import { firebaseRef } from '../firebase/index';
import formatDate from '../helpers/DateFormatter';
import AuthStore from '../stores/AuthStore';
import ShareIcon from './ShareIcon.jsx';

const alertOptions = {
  offset: 14,
  position: 'bottom left',
  theme: 'dark',
  time: 4000,
  transition: 'scale'
};

/**
 * Article Component
 * @class
 * @extends React.Component
 */
export default class Article extends Component {
  /**
   * @description Creates an instance of Article
   * @memberOf Article
   * @constructor
   * @param {Object} props Properties of the class
   */
  constructor(props) {
    super(props);

    this.getArticle = this.getArticle.bind(this);
    this.onClick = this.onClick.bind(this);
    this.storeArticle = this.storeArticle.bind(this);

    this.state = {
      article: null,
      disabled: false,
      userId: '',
    };
  }

  /**
   * @description componentDidMount
   * @method
   * @memberOf Article
   * @returns {void}
   */
  componentDidMount() {
    const url = ArticleStore.getUrl();
    const user = Object.keys(AuthStore.user).length !== 0 ?
      AuthStore.user : JSON.parse(localStorage.getItem('user'));
    getArticle(url);

    this.setUser(user);
    ArticleStore.on('article_change', this.getArticle);
  }

  /**
   * @description componentWillUnmount
   * @method
   * @memberOf Article
   * @returns {void}
   */
  componentWillUnmount() {
    ArticleStore.removeListener('article_change', this.getArticle);
  }

  /**
   * @description sets the state with the scraped article.
   * @method
   * @memberOf Article
   * @returns {void}
   */
  getArticle() {
    this.setState({
      article: ArticleStore.getParsedArticle(),
    });
  }

  /**
   * @description sets the state for userId.
   * @method
   * @memberOf Article
   * @param {Object} user The user object from the AuthStore
   * @returns {void}
   */
  setUser(user) {
    this.setState({
      userId: user.uid,
    });
  }

  /**
   * @description redirects back to the headlines route.
   * @method
   * @memberOf Article
   * @returns {void}
   */
  onClick() {
    hashHistory.push('/headlines');
  }

  /**
   * @description shows alert when an article is saved.
   * @method
   * @memberOf Article
   * @returns {void}
   */
  showAlert() {
    this.msg.show('Article saved.');
  }

  /**
   * @description saves scraped article to the DB.
   * @method
   * @memberOf Article
   * @returns {void}
   */
  storeArticle() {
    const { article, userId } = this.state;
    const articleToSave = {
      title: article.title,
      content: article.content,
      date_published: formatDate(article.date_published),
      date_added: formatDate(new Date().getDate()),
      lead_image_url: article.lead_image_url,
      dek: article.dek,
      url: article.url,
      domain: article.domain,
      excerpt: article.excerpt,
      word_count: article.word_count,
      direction: article.direction,
      total_pages: article.total_pages,
      rendered_pages: article.rendered_pages,
    };

    firebaseRef.child(`users/${userId}/articles`).push(articleToSave);
    this.setState({
      disabled: true,
    });
    this.showAlert();
  }

  /**
   * @description renders the articles
   * @method
   * @memberOf Article
   * @returns {span} span
   */
  render() {
    const { article, disabled } = this.state;

    return (
      article ? (
        <span>
          <AlertContainer ref={a => this.msg = a} {...alertOptions} />
          <Container text textAlign='justified'>
            <Segment raised>
              <Button circular icon='arrow left' onClick={this.onClick} />
              <Button circular
                      disabled={disabled}
                      positive
                      icon='save'
                      onClick={this.storeArticle}
              />
              <Header as='h2'>{article.title}</Header>
              <small>{formatDate(article.date_published)}</small>
              <ShareIcon url={article.url} title={article.title} />
              <Divider hidden />
              <span dangerouslySetInnerHTML={{ __html: article.content }} />
            </Segment>
          </Container>
        </span>
      ) : (
        <Dimmer active inverted>
          <Loader size='large' inline='centered'>Loading</Loader>
        </Dimmer>
      )
    );
  }
}
