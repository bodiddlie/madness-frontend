import React from 'react';

import { addGameToList, getList, searchByTitle, removeGame } from './api';
import { Search } from './search';
import { GameCard } from './game-card';

const initialValue = {
  showSearch: false,
  searchValue: '',
  searchResults: [],
  pile: null,
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'SHOW_SEARCH': {
      return { ...state, showSearch: true };
    }
    case 'HIDE_SEARCH': {
      return {
        ...state,
        showSearch: false,
        searchResults: [],
        searchValue: '',
      };
    }
    case 'UPDATE_SEARCH_VALUE': {
      return { ...state, searchValue: payload };
    }
    case 'START_SEARCH': {
      return { ...state, searchResults: null };
    }
    case 'SET_RESULTS': {
      return { ...state, searchResults: payload };
    }
    case 'ADD_GAME': {
      const pile = state.pile ? [...state.pile, payload] : [payload];
      return {
        ...state,
        pile,
      };
    }
    case 'REMOVE_GAME': {
      const pile = state.pile.filter((g) => g.id !== payload);
      return { ...state, pile };
    }
    case 'LOAD_PILE': {
      return { ...state, pile: null };
    }
    case 'SET_PILE': {
      return { ...state, pile: payload };
    }
    default: {
      return state;
    }
  }
}
export function List() {
  const [state, dispatch] = React.useReducer(reducer, initialValue);

  React.useEffect(() => {
    dispatch({ type: 'LOAD_PILE' });
    getList().then((pile) => dispatch({ type: 'SET_PILE', payload: pile }));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: 'START_SEARCH' });
    const data = await searchByTitle(state.searchValue);
    console.log(data);
    const results = data.map((g) => {
      return {
        ...g,
        isInList: !!state.pile && !!state.pile.find((item) => item.id === g.id),
      };
    });
    dispatch({ type: 'SET_RESULTS', payload: results });
  };

  const handleChange = (event) => {
    dispatch({ type: 'UPDATE_SEARCH_VALUE', payload: event.target.value });
  };

  const handleFocus = () => {
    dispatch({ type: 'SHOW_SEARCH' });
  };

  const handleDone = () => {
    dispatch({ type: 'HIDE_SEARCH' });
  };

  const handleAdd = async (id, title, boxArt) => {
    try {
      const game = await addGameToList(id, title, boxArt);
      dispatch({ type: 'ADD_GAME', payload: game });
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeGame(id);
      dispatch({ type: 'REMOVE_GAME', payload: id });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex">
        <button type="button" className="w-16" onClick={handleDone}>
          {state.showSearch ? <span>Done</span> : <span>&nbsp;</span>}
        </button>
        <input
          type="search"
          className="flex-1 border border-blue-600"
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
            <div className="grid gap-3 grid-cols-expando p-2">
              {state.pile.map((g) => (
                <GameCard
                  game={g}
                  key={g.id}
                  handleRemove={() => handleRemove(g.id)}
                  isInList={isInList(state.pile, g.id)}
                />
              ))}
            </div>
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
