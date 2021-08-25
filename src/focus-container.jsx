import React from 'react';

import { Bracket } from './bracket';
import { Focus } from './focus';
import { List } from './list';

export function FocusContainer({ profile }) {
  const [showBracket, setShowBracket] = React.useState(false);

  const handleBracketClick = () => {
    setShowBracket(true);
  };

  if (profile.isSorted) {
    return <Focus />;
  } else if (showBracket) {
    return <Bracket />;
  } else {
    return <List onBracketClick={handleBracketClick} />;
  }
}
