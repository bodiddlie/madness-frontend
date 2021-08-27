import React from 'react';

import { Bracket } from './bracket';
import { Focus } from './focus';
import { List } from './list';

export function FocusContainer({ profile }) {
  const [showBracket, setShowBracket] = React.useState(false);
  const [pile, setPile] = React.useState([]);

  const handleBracketClick = (games) => {
    setPile(games);
    setShowBracket(true);
  };

  if (profile.isSorted) {
    return <Focus />;
  } else if (showBracket) {
    return <Bracket pile={pile} />;
  } else {
    return <List onBracketClick={handleBracketClick} />;
  }
}
