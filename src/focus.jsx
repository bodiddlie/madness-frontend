import React from 'react';

import { getTopGame, completeGame } from './api';
import { Dispatch } from './focus-container';
import { SET_UNSORTED } from './reducer';

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
    <div>
      {game ? (
        <div>
          {game.title}
          <button type="button" onClick={handleClick}>
            Complete
          </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
