import React, { Component } from 'react';
import { Grid, Button, Dropdown, Icon, Segment, Header, Divider } from 'semantic-ui-react';

import { githubProvider, googleProvider } from '../firebase/index';
import { startLogin } from '../actions/AuthActions';
import loadSources from '../actions/SourceActions';
import SourceStore from '../stores/SourceStore';

/**
 * @class Login
 * @extends React.Component
 */
export default class Login extends Component {
  /**
   * Creates an instance of Login
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.setSourceKey = this.setSourceKey.bind(this);
  }

  /**
   * componentDidMount
   * @method
   * @returns {void}
   */
  componentDidMount() {
    loadSources();
    SourceStore.on('source_change', this.setSourceKey);
  }

  /**
   * componentWillUnmount
   * @method
   * @returns {void}
   */
  componentWillUnmount() {
    SourceStore.removeListener('source_change', this.setSourceKey);
  }

  /**
   * randomly selects a source from all sources list and sets it in local storage.
   * @method
   * @returns {void}
   */
  setSourceKey() {
    if (!localStorage.sourceKey) {
      const sources = SourceStore.getAll();
      const sourceIndex = Math.floor((Math.random() * sources.length) + 1);
      localStorage.sourceKey = sources[sourceIndex].id;
    }
  }

  /**
   * passed an auth provider, it initiates the auth process for the supplied provider
   * @method
   * @param {Object} authProvider The authentication provider to use
   * @returns {void}
   */
  onLogin(authProvider) {
    startLogin(authProvider);
  }

  /**
   * renders the Login component
   * @method
   * @returns {Grid} Grid
   */
  render() {
    return (
      <Grid centered columns={4}>
        <Grid.Column>
          <div className="login-container">
            <Segment>
              <Header as="h1" textAlign="center">Newslines</Header>
              <Header as="h2" icon textAlign="center">
                <Icon name="user" circular />
              </Header>
              <Divider section hidden />
              <Button color="google plus"
                      fluid
                      onClick={this.onLogin.bind(null, googleProvider)}>
                <Icon name="google plus" />
                Login with Google
              </Button>
              <Divider horizontal>Or</Divider>
              <Button color="green"
                      fluid
                      onClick={this.onLogin.bind(null, githubProvider)}>
                <Icon name="github" />
                Login with GitHub
              </Button>
            </Segment>
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}
