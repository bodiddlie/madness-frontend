import React from 'react';

import { getTopGame, completeGame } from './api';
import { Dispatch } from './focus-container';
import { SET_UNSORTED } from './reducer';
import { GameCard } from './game-card';

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
  );
}
