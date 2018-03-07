import * as React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const serialize = require('serialize-javascript');

class Html extends React.PureComponent {
  resolve(files) {
    return files.map((src) => {
      if (!this.props.manifest[src]) { return ''; }
      return `${this.props.manifest[src]}`;
    }).filter(file => file !== undefined);
  }

  render() {
    const head = Helmet.rewind();
    const { markup, store, css } = this.props;
    const styles = this.resolve(['vendor.css', 'app.css']);
    const renderStyles = styles.map((src, i) =>
      <link key={i} rel="stylesheet" type="text/css" href={src} />,
    );

    const scripts = this.resolve(['vendor.js', 'app.js']);
    const renderScripts = scripts.map((src, i) =>
      <script src={src} key={i} />,
    );

    // tslint:disable-next-line:max-line-length
    const initialState = (
      <script
        dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${serialize(store.getState(), { isJSON: true })};` }}
        charSet="UTF-8"
      />
    );

    return (
      <html lang="en">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {renderStyles}
          {head.script.toComponent()}
          <link rel="shortcut icon" href="/favicon.ico" />
        </head>
        <body style={{ margin: 0 }}>
          <main id="root" dangerouslySetInnerHTML={{ __html: markup }} />
          {initialState}
          <style id="jss-server-side">{css}</style>
          {renderScripts}
        </body>
      </html>
    );
  }
}

Html.propTypes = {
  manifest: PropTypes.object.isRequired,
  markup: PropTypes.any,
  store: PropTypes.any,
  css: PropTypes.string,
};

export { Html };
