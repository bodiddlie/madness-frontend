import React from 'react';

import { getTopGame, removeGame } from './api';
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
  const [errorText, setErrorText] = React.useState(null);
  const dispatch = React.useContext(Dispatch);

  const loadGame = React.useCallback(() => {
    getTopGame()
      .then((g) => {
        setGame(g);
        setLoading(false);
        setCompleting(false);
        if (!g) {
          dispatch({ type: SET_UNSORTED });
        }
        setErrorText(null);
      })
      .catch((err) => {
        console.error(err);
        setErrorText(
          'An error occurred while loading the next game in your list. Please try reloading.',
        );
      });
  }, [dispatch]);

  React.useEffect(() => {
    loadGame();
  }, [loadGame]);

  const handleClick = async () => {
    setCompleting(true);
    try {
      await removeGame(game.id);
      setErrorText(null);
      loadGame();
    } catch (err) {
      console.error(err);
      setErrorText(
        'An error occurred while completing the game. Please try again.',
      );
    }
    setCompleting(false);
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
              {!!errorText && (
                <h3 className="text-gray-800 border border-gray-800 bg-red-200 p-2 rounded-2xl m-2">
                  {errorText}
                </h3>
              )}
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
