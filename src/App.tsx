import React from 'react';
import logo from './logo.svg';
import './App.css';

import {searchByTitle} from './api';
import { Game } from './types';

function App() {
  const [title, setTitle] = React.useState('');
  const [games, setGames] = React.useState<Array<Game>>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = await searchByTitle(title);
    setGames(data);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button>Submit</button>
      </form>
      {games.map(g => (
        <div key={g.name}>
          <img src={g.image} alt={g.name} />
          <p>{g.name}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
