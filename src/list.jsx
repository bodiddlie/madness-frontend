import React from 'react';

import { addGame, getList, searchByTitle, removeGame } from './api';
import { Search } from './search';
import { GameCard } from './game-card';
import { Dispatch } from './focus-container';

import {
  LOAD_PILE,
  SET_PILE,
  START_SEARCH,
  SET_RESULTS,
  UPDATE_SEARCH_VALUE,
  SHOW_SEARCH,
  HIDE_SEARCH,
  ADD_GAME,
  REMOVE_GAME,
} from './reducer';

export function List({ onBracketClick, state }) {
  const dispatch = React.useContext(Dispatch);

  React.useEffect(() => {
    dispatch({ type: LOAD_PILE });
    getList().then((pile) => dispatch({ type: SET_PILE, payload: pile }));
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: START_SEARCH });
    const data = await searchByTitle(state.searchValue);
    console.log(data);
    const results = data.map((g) => {
      return {
        ...g,
        isInList: !!state.pile && !!state.pile.find((item) => item.id === g.id),
      };
    });
    dispatch({ type: SET_RESULTS, payload: results });
  };

  const handleChange = (event) => {
    dispatch({ type: UPDATE_SEARCH_VALUE, payload: event.target.value });
  };

  const handleFocus = () => {
    dispatch({ type: SHOW_SEARCH });
  };

  const handleDone = () => {
    dispatch({ type: HIDE_SEARCH });
  };

  const handleAdd = async (id, title, boxArt, description) => {
    try {
      const game = await addGame(id, title, boxArt, description);
      dispatch({ type: ADD_GAME, payload: game });
    } catch (err) {
      console.error(err);
    }
  };

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
      <form onSubmit={handleSubmit} className="flex">
        <button type="button" className="w-16" onClick={handleDone}>
          {state.showSearch ? <span>Done</span> : <span>&nbsp;</span>}
        </button>
        <input
          type="search"
          name="search"
          className="flex-1 border border-blue-600 p-1"
          value={state.searchValue}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </form>
      {state.showSearch ? (
        <Search
          searchResults={state.searchResults}
          addGame={handleAdd}
          removeGame={handleRemove}
          list={state.pile}
        />
      ) : (
        <React.Fragment>
          {state.pile ? (
            <React.Fragment>
              <div className="grid gap-3 grid-cols-expando p-2 pb-16 flex-grow">
                {state.pile.map((g) => (
                  <GameCard
                    game={g}
                    key={g.id}
                    handleRemove={() => handleRemove(g.id)}
                    isInList={isInList(state.pile, g.id)}
                  />
                ))}
              </div>
              <div className="bg-purple-700 h-12 fixed bottom-0 w-full">
                Footer
                <button type="button" onClick={handleBracketClick}>
                  Bracket
                </button>
              </div>
            </React.Fragment>
          ) : (
            <div>Loading...</div>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

function isInList(list, id) {
  return !!list.find((g) => g.id === id);
}
