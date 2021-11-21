import React from 'react';

import { Bracket } from './bracket';
import { Focus } from './focus';
import { List } from './list';

import {
  reducer,
  initialValue,
  SHOW_BRACKET,
  LOAD_PILE,
  SET_PILE,
} from './reducer';
import { getList } from './api';

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

  React.useEffect(() => {
    dispatch({ type: LOAD_PILE });
    getList().then((pile) => dispatch({ type: SET_PILE, payload: pile }));
  }, [dispatch]);

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
