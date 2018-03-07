import app from 'containers/App';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Store from './app/redux/store';

require('regenerator-runtime/runtime');

const windowIfDefined = typeof window === 'undefined' ? {} : window;

const store = new Store(
  createHistory(),
  windowIfDefined.__INITIAL_STATE__,
);

const s = store.store();
const App = app();

ReactDOM.hydrate(
  <Provider store={s} key="provider">
    <ConnectedRouter history={store.history()}>
      <App />
    </ConnectedRouter>
  </Provider>
  ,
  document.querySelector('#root'),
);
