import React from 'react';

export function GameCard({ game, handleAdd, handleRemove, isInList }) {
  return (
    <div
      className="flex items-center p-4 bg-white border-2 border-gray-400 rounded-lg shadow-sm"
      key={game.id}
    >
      <img className="max-h-24" src={game.boxArt} alt={game.title} />
      <div className="flex flex-col ml-5 w-full">
        <h4 className="text-xl font-semibold mb-2">{game.title}</h4>
        <p>{game.description}</p>
        {isInList || !handleAdd ? (
          <button
            type="button"
            className="py-3 px-6 text-white rounded-lg bg-red-400 shadow-lg self-end"
            onClick={() => handleRemove(game.id)}
          >
            Remove
          </button>
        ) : (
          <React.Fragment>
            {!!handleAdd ? (
              <button
                type="button"
                className="py-3 px-6 text-white rounded-lg bg-green-400 shadow-lg self-end"
                onClick={() => handleAdd(game.id, game.title, game.boxArt)}
              >
                Add
              </button>
            ) : null}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
