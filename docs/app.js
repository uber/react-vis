import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import AppState from './docs-app/reducers';
import Routes from './docs-app/routes';

import './docs-app/demo.scss';
import '../src/styles/examples.scss';

/* global document */

ReactDOM.render(
  <Provider store={AppState} >
    <Routes />
  </Provider>,
  document.getElementById('index')
);
