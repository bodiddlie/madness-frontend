import React from 'react';

import { Bracket } from './bracket';
import { Focus } from './focus';
import { List } from './list';

import { reducer, initialValue, SHOW_BRACKET } from './reducer';

export const Dispatch = React.createContext(null);
export const State = React.createContext(null);

export function FocusContainer({ profile }) {
  const [state, dispatch] = React.useReducer(reducer, {
    ...initialValue,
    isSorted: profile.isSorted,
  });

  const handleBracketClick = () => {
    dispatch({ type: SHOW_BRACKET });
  };

  return (
    <State.Provider value={state}>
      <Dispatch.Provider value={dispatch}>
        {state.isSorted ? (
          <Focus />
        ) : state.showBracket ? (
          <Bracket pile={state.pile} />
        ) : (
          <List onBracketClick={handleBracketClick} state={state} />
        )}
      </Dispatch.Provider>
    </State.Provider>
  );
}
