import React from 'react';

import { removeGame } from './api';
import { Search } from './search';
import { GameCard } from './game-card';
import { Dispatch } from './focus-container';
import { REMOVE_GAME } from './reducer';
import { Loading } from './loading';
import { ActionButton } from './action-button';

export function List({ onBracketClick, state }) {
  const dispatch = React.useContext(Dispatch);
  const [processingIds, setProcessingIds] = React.useState([]);
  const [errorText, setErrorText] = React.useState(null);

  const handleRemove = async (id) => {
    let newIds = [...processingIds, id];
    setProcessingIds(newIds);
    try {
      await removeGame(id);
      setErrorText(null);
      dispatch({ type: REMOVE_GAME, payload: id });
    } catch (err) {
      console.error(err);
      setErrorText(
        'An error occurred while removing a game from the tournament. Please try again.',
      );
    }
    const index = newIds.indexOf(id);
    setProcessingIds([...newIds.slice(0, index), ...newIds.slice(index + 1)]);
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
              {state.pile.length > 0 ? (
                <React.Fragment>
                  {!!errorText && (
                    <h3 className="text-gray-800 border border-gray-800 bg-red-200 p-2 rounded-2xl m-2">
                      {errorText}
                    </h3>
                  )}
                  <div className="grid gap-3 grid-cols-expando p-2 pb-16">
                    {state.pile.map((g) => (
                      <GameCard game={g} key={g.id}>
                        <ActionButton
                          onClick={() => handleRemove(g.id)}
                          performingAction={processingIds.indexOf(g.id) > -1}
                          negative
                        >
                          Remove
                        </ActionButton>
                      </GameCard>
                    ))}
                  </div>
                </React.Fragment>
              ) : (
                <div className="flex-grow flex flex-col justify-center items-center">
                  <h3 className="text-gray-800 border border-gray-800 bg-yellow-200 p-2 rounded-2xl m-2">
                    No games added to your tournament yet. Search for some games
                    above and them to the tournament list.
                  </h3>
                </div>
              )}
            </React.Fragment>
          ) : (
            <div className="flex-col flex-grow flex justify-center items-center">
              <Loading />
            </div>
          )}
        </React.Fragment>
      </Search>
    </div>
  );
}
