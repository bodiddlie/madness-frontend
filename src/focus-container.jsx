import React from 'react';

import { Bracket } from './bracket';
import { Focus } from './focus';
import { List } from './list';

import { reducer, initialValue } from './reducer';

export const Dispatch = React.createContext(null);

export function FocusContainer({ profile }) {
  const [state, dispatch] = React.useReducer(reducer, initialValue);
  const [showBracket, setShowBracket] = React.useState(false);
  const [pile, setPile] = React.useState([]);

  const handleBracketClick = (games) => {
    setPile(games);
    setShowBracket(true);
  };

  return (
    <Dispatch.Provider value={dispatch}>
      {profile.isSorted ? (
        <Focus />
      ) : showBracket ? (
        <Bracket pile={pile} />
      ) : (
        <List onBracketClick={handleBracketClick} state={state} />
      )}
    </Dispatch.Provider>
  );
}
