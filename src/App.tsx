import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import { Header, Articles, ArticleEdit } from '@containers';
import { PAGES_PATHS } from '@commons/constants';

export class App extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Articles />
          </Route>
          <Route path={PAGES_PATHS.articles}>
            <Redirect to="/" />
          </Route>
          <Route path={PAGES_PATHS.article}>
            <ArticleEdit />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

function Home() {
  return <h2>articlesList</h2>;
}

function Users() {
  return <h2>article</h2>;
}

function About() {
  return <h2>articleAdd</h2>;
}
