import React from 'react';

import { addGameToList, getList, searchByTitle } from './api';
import { Search } from './search';

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
      return { ...state, showSearch: false };
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
      return {
        ...state,
        pile: state.pile ? [...state.pile, payload] : [payload],
      };
    }
    default: {
      return state;
    }
  }
}
export function List() {
  const [state, dispatch] = React.useReducer(reducer, initialValue);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: 'START_SEARCH' });
    const data = await searchByTitle(state.searchValue);
    const results = data.map((g) => {
      return {
        ...g,
        isInList:
          !!state.pile && !!state.pile.find((item) => item.title === g.name),
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

  const handleAdd = async (title, boxArt) => {
    try {
      const game = await addGameToList(title, boxArt);
      dispatch({ type: 'ADD_GAME', payload: game });
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
        <Search searchResults={state.searchResults} addGameToList={handleAdd} />
      ) : (
        <div>List goes here</div>
      )}
    </div>
  );
}
