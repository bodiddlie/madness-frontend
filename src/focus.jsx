import React from 'react';

import { getTopGame, completeGame } from './api';
import { Dispatch } from './focus-container';
import { SET_UNSORTED } from './reducer';
import { GameCard } from './game-card';
import { Search } from './search';

export function Focus() {
  const [game, setGame] = React.useState(null);
  const dispatch = React.useContext(Dispatch);

  const loadGame = React.useCallback(() => {
    setGame(null);
    getTopGame().then((g) => {
      setGame(g);
      if (!g) {
        dispatch({ type: SET_UNSORTED });
      }
    });
  }, [dispatch]);

  React.useEffect(() => {
    loadGame();
  }, [loadGame]);

  const handleClick = async () => {
    await completeGame(game.id);
    loadGame();
  };

  return (
    <div className="flex flex-col flex-grow">
      <Search
        actionButton={
          <button
            type="button"
            className="w-20 p-1 bg-blue-400 rounded border border-blue-400 disabled:bg-gray-200"
            onClick={() => {}}
            disabled={true}
          >
            &nbsp;
            <br />
            &nbsp;
          </button>
        }
      >
        <div className="p-2">
          {game ? (
            <React.Fragment>
              <h3 className="text-xl font-bold">Current Game</h3>
              <GameCard game={game}>
                <button
                  type="button"
                  className="py-3 px-6 text-white rounded-lg bg-blue-400 shadow-lg self-end"
                  onClick={handleClick}
                >
                  Complete
                </button>
              </GameCard>
            </React.Fragment>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </Search>
    </div>
  );
}
