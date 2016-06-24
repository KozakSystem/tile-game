import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux'
import routes from './routes';
import configureStore from './store/configureStore'
import App from './containers/App'

const store = configureStore()

render(
  <Provider store={store}>
    <div className='app'>
     <Router history={browserHistory} routes={routes} />
    </div>
  </Provider>,
  document.getElementById('content')
);
