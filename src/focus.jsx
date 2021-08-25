import React from 'react';

import { getTopGame, completeGame } from './api';

export function Focus() {
  const [game, setGame] = React.useState(null);

  function loadGame() {
    setGame(null);
    getTopGame().then((g) => {
      setGame(g);
      if (!g) {
        //TODO: find way to reset back to list state
      }
    });
  }

  React.useEffect(() => {
    loadGame();
  }, []);

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
