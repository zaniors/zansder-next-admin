import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './router';
import history from './utils/history';
import './index.scss';

ReactDOM.render(
  <Router history={history}>
    {renderRoutes(routes)}
  </Router>,
  document.getElementById('root')
);
