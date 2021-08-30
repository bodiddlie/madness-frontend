export const SHOW_SEARCH = 'SHOW_SEARCH';
export const HIDE_SEARCH = 'HIDE_SEARCH';
export const UPDATE_SEARCH_VALUE = 'UPDATE_SEARCH_VALUE';
export const START_SEARCH = 'START_SEARCH';
export const SET_RESULTS = 'SET_RESULTS';
export const ADD_GAME = 'ADD_GAME';
export const REMOVE_GAME = 'REMOVE_GAME';
export const LOAD_PILE = 'LOAD_PILE';
export const SET_PILE = 'SET_PILE';

export const initialValue = {
  showSearch: false,
  searchValue: '',
  searchResults: [],
  pile: null,
};

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case SHOW_SEARCH: {
      return { ...state, showSearch: true };
    }
    case HIDE_SEARCH: {
      return {
        ...state,
        showSearch: false,
        searchResults: [],
        searchValue: '',
      };
    }
    case UPDATE_SEARCH_VALUE: {
      return { ...state, searchValue: payload };
    }
    case START_SEARCH: {
      return { ...state, searchResults: null };
    }
    case SET_RESULTS: {
      return { ...state, searchResults: payload };
    }
    case ADD_GAME: {
      const pile = state.pile ? [...state.pile, payload] : [payload];
      return {
        ...state,
        pile,
      };
    }
    case REMOVE_GAME: {
      const pile = state.pile.filter((g) => g.id !== payload);
      return { ...state, pile };
    }
    case LOAD_PILE: {
      return { ...state, pile: null };
    }
    case SET_PILE: {
      return { ...state, pile: payload };
    }
    default: {
      return state;
    }
  }
}
