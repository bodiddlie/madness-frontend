import React from 'react';
import { GameCard } from './game-card';
import { MdSearch, MdClear } from 'react-icons/md';
import { addGame, removeGame, searchByTitle } from './api';
import { Dispatch, State } from './focus-container';
import { ADD_GAME, REMOVE_GAME } from './reducer';
import { ActionButton } from './action-button';
import { Loading } from './loading';

function isInList(list, id) {
  return !!list.find((g) => g.id === id);
}

const initialState = {
  searchValue: '',
  showSearch: false,
  searchResults: null,
  loading: false,
  processingIds: [],
  errorText: null,
};

const UPDATE_SEARCH_VALUE = 'UPDATE_SEARCH_VALUE';
const SHOW_SEARCH = 'SHOW_SEARCH';
const HIDE_SEARCH = 'HIDE_SEARCH';
const START_SEARCH = 'START_SEARCH';
const LOAD_SEARCH = 'LOAD_SEARCH';
const FAILED_SEARCH = 'FAILED_SEARCH';
const START_PROCESS = 'START_PROCESS';
const FINISH_PROCESS = 'FINISH_PROCESS';
const FAILED_PROCESS = 'FAILED_PROCESS';

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_SEARCH_VALUE: {
      return { ...state, searchValue: action.payload };
    }
    case SHOW_SEARCH: {
      return {
        ...state,
        showSearch: true,
      };
    }
    case HIDE_SEARCH: {
      return {
        ...state,
        showSearch: false,
        errorText: null,
        loading: false,
        searchResults: null,
        searchValue: '',
      };
    }
    case START_SEARCH: {
      return { ...state, loading: true, searchResults: null, errorText: null };
    }
    case LOAD_SEARCH: {
      return { ...state, loading: false, searchResults: action.payload };
    }
    case FAILED_SEARCH: {
      return {
        ...state,
        loading: false,
        searchResults: null,
        errorText: action.payload,
      };
    }
    case START_PROCESS: {
      return {
        ...state,
        processingIds: [...state.processingIds, action.payload],
      };
    }
    case FINISH_PROCESS: {
      const index = state.processingIds.indexOf(action.payload);
      return {
        ...state,
        processingIds: [
          ...state.processingIds.slice(0, index),
          ...state.processingIds.slice(index + 1),
        ],
      };
    }
    case FAILED_PROCESS: {
      const { id, errorText } = action.payload;
      const index = state.processingIds.indexOf(id);
      return {
        ...state,
        processingIds: [
          ...state.processingIds.slice(0, index),
          ...state.processingIds.slice(index + 1),
        ],
        errorText,
      };
    }
    default: {
      return state;
    }
  }
}

export function Search({ actionButton, children }) {
  const state = React.useContext(State);
  const dispatch = React.useContext(Dispatch);
  const [innerState, innerDispatch] = React.useReducer(reducer, initialState);

  const handleAdd = async (id, title, boxArt, description) => {
    try {
      innerDispatch({ type: START_PROCESS, payload: id });
      const game = await addGame(id, title, boxArt, description);
      innerDispatch({ type: FINISH_PROCESS, payload: id });
      dispatch({ type: ADD_GAME, payload: game });
    } catch (err) {
      console.error(err);
      innerDispatch({
        type: FAILED_PROCESS,
        payload: {
          id,
          errorText:
            'An error occurred while adding the game to the tournament. Please try again.',
        },
      });
    }
  };

  const handleRemove = async (id) => {
    try {
      innerDispatch({ type: START_PROCESS, payload: id });
      await removeGame(id);
      innerDispatch({ type: FINISH_PROCESS, payload: id });
      dispatch({ type: REMOVE_GAME, payload: id });
    } catch (err) {
      console.error(err);
      innerDispatch({
        type: FAILED_PROCESS,
        payload: {
          id,
          errorText:
            'An error occurred while removing the game from the tournament. Please try again.',
        },
      });
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      innerDispatch({ type: START_SEARCH });
      const data = await searchByTitle(innerState.searchValue);
      innerDispatch({ type: LOAD_SEARCH, payload: data });
    } catch (error) {
      console.error(error);
      innerDispatch({
        type: FAILED_SEARCH,
        payload:
          'An error occured while searching for games. Please try again.',
      });
    }
  };

  const handleCancel = () => {
    innerDispatch({ type: HIDE_SEARCH });
  };

  const clearSearch = () => {
    innerDispatch({ type: UPDATE_SEARCH_VALUE, payload: '' });
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="flex pr-2">
        <div className="flex bg-white flex-1">
          <input
            type="text"
            name="search"
            className="flex-1 p-1 rounded-none bg-white appearance-none"
            placeholder="Find a game..."
            value={innerState.searchValue}
            onChange={(e) =>
              innerDispatch({
                type: UPDATE_SEARCH_VALUE,
                payload: e.target.value,
              })
            }
            onFocus={() => innerDispatch({ type: SHOW_SEARCH })}
          />
          <button
            type="button"
            className="w-10 flex justify-center items-center text-2xl"
            onClick={clearSearch}
          >
            <MdClear />
          </button>
          <button
            type="submit"
            className="w-10 flex justify-center items-center text-2xl"
            disabled={innerState.loading}
          >
            <MdSearch />
          </button>
        </div>
        {innerState.showSearch ? (
          <button
            type="button"
            className="w-20 p-1 bg-blue-400 rounded border border-blue-400 disabled:bg-gray-200"
            onClick={handleCancel}
          >
            Cancel Search
          </button>
        ) : (
          <React.Fragment>{actionButton}</React.Fragment>
        )}
      </form>
      {!!innerState.errorText && (
        <h3 className="text-gray-800 border border-gray-800 bg-red-200 p-2 rounded-2xl m-2">
          {innerState.errorText}
        </h3>
      )}
      {innerState.showSearch ? (
        <React.Fragment>
          {innerState.searchResults ? (
            <React.Fragment>
              {innerState.searchResults.length > 0 ? (
                <div className="grid gap-3 grid-cols-expando p-2">
                  {innerState.searchResults.map((g) => (
                    <GameCard key={g.id} game={g}>
                      {isInList(state.pile, g.id) ? (
                        <ActionButton
                          performingAction={
                            innerState.processingIds.indexOf(g.id) > -1
                          }
                          onClick={() => handleRemove(g.id)}
                          negative
                        >
                          Remove
                        </ActionButton>
                      ) : (
                        <ActionButton
                          performingAction={
                            innerState.processingIds.indexOf(g.id) > -1
                          }
                          onClick={() => handleAdd(g.id, g.title, g.boxArt)}
                          positive
                        >
                          Add
                        </ActionButton>
                      )}
                    </GameCard>
                  ))}
                </div>
              ) : (
                <div className="flex-grow flex flex-col justify-center items-center">
                  <h3 className="text-gray-800 border border-gray-800 bg-yellow-200 p-2 rounded-2xl m-2">
                    No search results found try changing your search terms.
                  </h3>
                </div>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {innerState.loading && (
                <div className="flex-grow flex flex-col justify-center items-center">
                  <Loading />
                </div>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </React.Fragment>
  );
}
