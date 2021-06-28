import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './private-route';
import Header from './header';
import Home from './home';
import Login from './login';
import {MagicLink} from './magic-link';
import { List } from './list';
import { ProvideAuth } from './auth';

function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <div>
          <Header />
          <div>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/magic-link">
                <MagicLink />
              </Route>
              <PrivateRoute path="/list">
                <List />
              </PrivateRoute>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
