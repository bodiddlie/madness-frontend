import React from 'react';
import { GameCard } from './game-card';

function isInList(list, id) {
  return !!list.find((g) => g.id === id);
}

export function Search({ searchResults, addGame, removeGame, list }) {
  return (
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
  );
}
