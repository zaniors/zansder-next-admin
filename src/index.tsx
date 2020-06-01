import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './router';
import './index.scss';

ReactDOM.render(
  <Router>
    <Switch>
      {
        routes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            render={props => (
              <route.component>
                {
                  <Switch>
                    {
                      route.routes && route.routes.map((subRoute, i) => (
                        <Route
                          key={i}
                          path={subRoute.path}
                          render={props => (
                            <subRoute.component />
                          )} >
                        </Route>
                      ))
                    }
                  </Switch>
                }
              </route.component>
            )}
          />
        ))
      }
    </Switch>
  </Router>,
  document.getElementById('root')
);
