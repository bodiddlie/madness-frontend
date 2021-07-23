import React, { ChangeEvent, SyntheticEvent } from 'react';

import { Game } from './types';
import { searchByTitle } from './api';

export function List() {
  const [search, setSearch] = React.useState('');
  const [games, setGames] = React.useState<Array<Game>>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await searchByTitle(search);
    setGames(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border border-blue-600"
          value={search}
          onChange={handleChange}
        />
        <button>Search</button>
      </form>
      {games.map((g) => (
        <div key={g.id}>
          <img src={g.image} alt={g.name} />
          <p>{g.name}</p>
        </div>
      ))}
    </div>
  );
}
