import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
} from 'react-router';
// Reducer
import reducer from './RootReducer';
// UI
import App from './App';
import Home from './components/Home';

require('./styles/main.scss');

/* Development Store compatable with redux devtools */
const store = createStore(reducer, applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('App'));
