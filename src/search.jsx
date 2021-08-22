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
            <GameCard
              key={g.id}
              game={g}
              handleAdd={() => addGame(g.id, g.title, g.boxArt)}
              handleRemove={() => removeGame(g.id)}
              isInList={isInList(list, g.id)}
            />
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
