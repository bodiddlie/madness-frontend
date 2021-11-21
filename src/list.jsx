import React from 'react';

import { getList, removeGame } from './api';
import { Search } from './search';
import { GameCard } from './game-card';
import { Dispatch } from './focus-container';

import { LOAD_PILE, SET_PILE, REMOVE_GAME } from './reducer';

export function List({ onBracketClick, state }) {
  const dispatch = React.useContext(Dispatch);

  React.useEffect(() => {
    dispatch({ type: LOAD_PILE });
    getList().then((pile) => dispatch({ type: SET_PILE, payload: pile }));
  }, [dispatch]);

  const handleRemove = async (id) => {
    try {
      await removeGame(id);
      dispatch({ type: REMOVE_GAME, payload: id });
    } catch (err) {
      console.error(err);
    }
  };

  const handleBracketClick = () => {
    onBracketClick(state.pile);
  };

  return (
    <div className="flex flex-col flex-grow">
      <Search
        actionButton={
          <button
            type="button"
            className="w-20 p-1 bg-blue-400 rounded border border-blue-400 disabled:bg-gray-200"
            onClick={handleBracketClick}
            disabled={!state.pile || state.pile.length === 0}
          >
            Start Bracket
          </button>
        }
      >
        <React.Fragment>
          {state.pile ? (
            <React.Fragment>
              <div className="grid gap-3 grid-cols-expando p-2 pb-16">
                {state.pile.map((g) => (
                  <GameCard game={g} key={g.id}>
                    <button
                      type="button"
                      className="py-3 px-6 text-white rounded-lg bg-red-400 shadow-lg self-end"
                      onClick={() => handleRemove(g.id)}
                    >
                      Remove
                    </button>
                  </GameCard>
                ))}
              </div>
            </React.Fragment>
          ) : (
            <div>Loading...</div>
          )}
        </React.Fragment>
      </Search>
    </div>
  );
}
