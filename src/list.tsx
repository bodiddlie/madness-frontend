import React, { ChangeEvent, SyntheticEvent } from 'react';

import { SearchResult } from './types';
import { searchByTitle, addGameToList } from './api';

export function List() {
  const [search, setSearch] = React.useState('');
  const [games, setGames] = React.useState<Array<SearchResult>>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await searchByTitle(search);
    setGames(data);
  };

  const handleClick = async (title: String, boxArt: String) => {
    try {
      const data = await addGameToList(title, boxArt);
      setGames([]);
    } catch (err) {
      console.error(err);
    }
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
      <div className="grid gap-3 grid-cols-expando p-2">
        {games.map((g) => (
          <div
            className="flex items-center p-4 bg-white border-gray-200 rounded-lg shadow-sm"
            key={g.id}
          >
            <img className="max-h-24" src={g.image} alt={g.name} />
            <div className="flex flex-col ml-5 w-full">
              <h4 className="text-xl font-semibold mb-2">{g.name}</h4>
              <button
                type="button"
                className="py-3 px-6 text-white rounded-lg bg-green-400 shadow-lg self-end"
                onClick={() => handleClick(g.name, g.image)}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
