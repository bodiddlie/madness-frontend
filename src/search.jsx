import React from 'react';
import { GameCard } from './game-card';
import { MdSearch } from 'react-icons/md';
import { searchByTitle } from './api';

function isInList(list, id) {
  return !!list.find((g) => g.id === id);
}

export function Search({ addGame, removeGame, list, actionButton, children }) {
  const [searchValue, setSearchValue] = React.useState('');
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSearchResults(null);
    const data = await searchByTitle(searchValue);
    setSearchResults(data);
  };

  const handleCancel = () => {
    setSearchValue('');
    setSearchResults([]);
    setShowSearch(false);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="flex pr-2">
        <div className="flex bg-white flex-1">
          <input
            type="search"
            name="search"
            className="flex-1 p-1 rounded-none bg-white appearance-none"
            placeholder="Find a game..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setShowSearch(true)}
          />
          <button
            type="submit"
            className="w-10 flex justify-center items-center text-2xl"
          >
            <MdSearch />
          </button>
        </div>
        {showSearch ? (
          <button
            type="button"
            className="w-20 p-1 bg-blue-400 rounded border border-blue-400 disabled:bg-gray-200"
            onClick={handleCancel}
          >
            Cancel Search
          </button>
        ) : (
          <React.Fragment>{actionButton}</React.Fragment>
        )}
      </form>
      {showSearch ? (
        <div>
          {searchResults ? (
            <div className="grid gap-3 grid-cols-expando p-2">
              {searchResults.map((g) => (
                <GameCard key={g.id} game={g}>
                  {isInList(list, g.id) ? (
                    <button
                      type="button"
                      className="py-3 px-6 text-white rounded-lg bg-red-400 shadow-lg self-end"
                      onClick={() => removeGame(g.id)}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="py-3 px-6 text-white rounded-lg bg-green-400 shadow-lg self-end"
                      onClick={() => addGame(g.id, g.title, g.boxArt)}
                    >
                      Add
                    </button>
                  )}
                </GameCard>
              ))}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </React.Fragment>
  );
}
