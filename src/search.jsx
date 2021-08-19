import React from 'react';

export function Search({ searchResults, addGameToList }) {
  const handleClick = async (title, boxArt) => {
    addGameToList(title, boxArt);
  };

  return (
    <div>
      {searchResults ? (
        <div className="grid gap-3 grid-cols-expando p-2">
          {searchResults.map((g) => (
            <div
              className="flex items-center p-4 bg-white border-gray-200 rounded-lg shadow-sm"
              key={g.id}
            >
              <img className="max-h-24" src={g.image} alt={g.name} />
              <div className="flex flex-col ml-5 w-full">
                <h4 className="text-xl font-semibold mb-2">{g.name}</h4>
                {g.isInList ? (
                  <button
                    type="button"
                    className="py-3 px-6 text-white rounded-lg bg-red-400 shadow-lg self-end"
                    onClick={() => {}}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    className="py-3 px-6 text-white rounded-lg bg-green-400 shadow-lg self-end"
                    onClick={() => handleClick(g.name, g.image)}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
