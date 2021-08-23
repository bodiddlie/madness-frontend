import React from 'react';
import { Redirect } from 'react-router-dom';

import { getTopGame, completeGame } from './api';

export function Focus() {
  const [game, setGame] = React.useState(null);
  const [redirect, setRedirect] = React.useState(false);

  function loadGame() {
    setGame(null);
    getTopGame().then((g) => {
      setGame(g);
      if (!g) {
        setRedirect(true);
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
      {redirect ? (
        <Redirect to="/list" />
      ) : (
        <React.Fragment>
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
        </React.Fragment>
      )}
    </div>
  );
}
