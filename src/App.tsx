import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Header from './header';
import Home from './home';
import Login from './login';

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
        </Switch>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
