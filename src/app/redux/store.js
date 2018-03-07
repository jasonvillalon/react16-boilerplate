import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import log from 'log';

import rootReducer from './reducers';

const appConfig = require('../../../config/main');


export default class ConfigureStore {
  constructor(History, initialState) {
    try {
      this.History = History;
      this.routerMiddlewareH = routerMiddleware(this.History);
      this.initialState = initialState;
      const middlewares = [
        this.routerMiddlewareH,
        thunk,
      ];

      /** Add Only Dev. Middlewares */
      if (appConfig.env !== 'production' && process.env.BROWSER) {
        const logger = createLogger({
          level: 'info',
        });
        middlewares.push(logger);
      }
      const windowIfDefined = typeof window === 'undefined' ? {} : window;
      const composeEnhancers = (appConfig.env !== 'production' &&
      windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

      this.Store = createStore(rootReducer, this.initialState, composeEnhancers(
        applyMiddleware(...middlewares),
      ));

      if (appConfig.env === 'development' && module.hot) {
        module.hot.accept('./reducers', () => {
          this.Store.replaceReducer((require('./reducers')));
        });
      }
    } catch (err) {
      log('ERROR: ', err);
    }
  }

  store() {
    return this.Store;
  }

  history() {
    return this.History;
  }
}
