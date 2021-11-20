export const ADD_GAME = 'ADD_GAME';
export const REMOVE_GAME = 'REMOVE_GAME';
export const LOAD_PILE = 'LOAD_PILE';
export const SET_PILE = 'SET_PILE';
export const SHOW_BRACKET = 'SHOW_BRACKET';
export const SET_SORTED = 'SET_SORTED';
export const SET_UNSORTED = 'SET_UNSORTED';

export const initialValue = {
  showBracket: false,
  pile: null,
};

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
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
    case SHOW_BRACKET: {
      return { ...state, showBracket: true };
    }
    case SET_SORTED: {
      return { ...state, isSorted: true, showBracket: false };
    }
    case SET_UNSORTED: {
      return { ...state, isSorted: false };
    }
    default: {
      return state;
    }
  }
}
