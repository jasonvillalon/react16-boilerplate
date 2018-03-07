import { hot } from 'react-hot-loader';
import React from 'react';

import css from './css.css';
import scss from './style.scss';

export class App extends React.PureComponent {
  render() {
    return (
      <div className={scss.app}>
        <span className={css.label}>My Apps</span>
        <span className={scss.label2}>My Apps</span>
      </div>
    );
  }
}

export default () => hot(module)(App);
