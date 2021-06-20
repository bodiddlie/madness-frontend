import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import PrivateRoute from './private-route';
import Header from './header';
import Home from './home';
import Login from './login';
import {List} from './list';

function App() {

  return (
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
          <PrivateRoute path="/list">
            <List />
          </PrivateRoute>
        </Switch>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
