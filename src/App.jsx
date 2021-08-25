import React from 'react';
import queryString from 'query-string';

import Header from './header';
import Home from './home';
import { ProvideAuth } from './auth';

const urlQueryString = window.location.search;
const { magicLink } = queryString.parse(urlQueryString);

function App() {
  return (
    <ProvideAuth>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Home magicLink={magicLink} />
      </div>
    </ProvideAuth>
  );
}

export default App;
