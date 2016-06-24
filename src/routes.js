import React from 'react'
import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import browserHistory from 'react-router/lib/browserHistory'
import IndexRoute from 'react-router/lib/IndexRoute'
import Redirect from 'react-router/lib/Redirect'
import App from './containers/App'
import MainPage from './containers/MainPage'
import GamePage from './containers/GamePage'
import NotFound from './containers/NotFound'

module.exports = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MainPage} />

      <Route path="game" component={GamePage} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);