import React from 'react';

import { createMemoryHistory } from 'history';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';

import { App, Html } from './app/containers';
import Store from './app/redux/store';
import log from './app/log';

require('regenerator-runtime/runtime');

const appConfig = require('../config/main');
const manifest = require('../build/manifest.json');

const express = require('express');
const path = require('path');
const compression = require('compression');
const Chalk = require('chalk');
const favicon = require('serve-favicon');

const app = express();

app.use(compression());

function renderHTML(markup, css, store) {
  const html = renderToString(
    <Html markup={markup} css={css} manifest={manifest} store={store} />,
  );

  return `<!doctype html> ${html}`;
}

app.use(favicon(path.join(__dirname, 'public/favicon.ico')));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('*', async (req, res) => {
  try {
    const memoryHistory = createMemoryHistory(req.url);
    const initialState = {
    };
    const store = new Store(memoryHistory, initialState);
    const context = {};
    const html = renderToString(
      <Provider store={store.store()} key="provider">
        <StaticRouter
          location={req.url}
          context={context}
        >
          <App />
        </StaticRouter>
      </Provider>,
    );
    if (context.url) {
      res.redirect(302, context.url);
    } else {
      res.status(200).send(renderHTML(html, '', store.store()));
    }
  } catch (err) {
    log('ERROR:', err);
  }
});

app.listen(appConfig.port, appConfig.host, (err) => {
  if (err) {
    log('ERR: ', Chalk.bgRed(err));
  } else {
    log('SUCCESS: ', Chalk.black.bgGreen(
      `\n\n💂  Listening at http://${appConfig.host}:${appConfig.port}\n`,
    ));
  }
});
