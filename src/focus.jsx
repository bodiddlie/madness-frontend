import React from 'react';

import { getTopGame, completeGame } from './api';
import { Dispatch } from './focus-container';
import { SET_UNSORTED } from './reducer';
import { GameCard } from './game-card';
import { Search } from './search';
import { Loading } from './loading';
import { ActionButton } from './action-button';

export function Focus() {
  const [game, setGame] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [completing, setCompleting] = React.useState(false);
  const dispatch = React.useContext(Dispatch);

  const loadGame = React.useCallback(() => {
    getTopGame().then((g) => {
      setGame(g);
      setLoading(false);
      setCompleting(false);
      if (!g) {
        dispatch({ type: SET_UNSORTED });
      }
    });
  }, [dispatch]);

  React.useEffect(() => {
    loadGame();
  }, [loadGame]);

  const handleClick = async () => {
    setCompleting(true);
    await completeGame(game.id);
    loadGame();
  };

  return (
    <React.Fragment>
      {loading ? (
        <div className="flex-grow flex flex-col justify-center items-center p-2">
          <h1 className="mb-4">Loading next game...</h1>
          <Loading />
        </div>
      ) : (
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
              <h3 className="text-xl font-bold">Current Game</h3>
              <GameCard game={game}>
                <ActionButton
                  performingAction={completing}
                  onClick={handleClick}
                >
                  Complete
                </ActionButton>
              </GameCard>
            </div>
          </Search>
        </div>
      )}
    </React.Fragment>
  );
}
