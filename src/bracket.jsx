import React, { useState, useEffect } from 'react';
import { updateSort } from './api';

import { Dispatch } from './focus-container';
import { SET_SORTED } from './reducer';

export function Bracket({ pile }) {
  const [remaining, setRemaining] = useState([]);
  const [winners, setWinners] = useState([]);
  const [losers, setLosers] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [gold, setGold] = useState(null);

  const dispatch = React.useContext(Dispatch);

  useEffect(() => {
    let gamesLeft = [...pile];
    if (pile.length % 2 === 1) {
      let index = getRandomIndex(gamesLeft);
      setWinners([gamesLeft[index]]);
      gamesLeft = [...gamesLeft.slice(0, index), ...gamesLeft.slice(index + 1)];
    }

    const [one, two, left] = pickNext(gamesLeft);
    setFirst(one);
    setSecond(two);
    setRemaining(left);
  }, [pile]);

  function pick(w, l) {
    if (remaining.length > 0) {
      setWinners([...winners, w]);
      setLosers([...losers, l]);
      const [one, two, rem] = pickNext(remaining);
      setFirst(one);
      setSecond(two);
      setRemaining(rem);
    } else {
      if (winners.length > 0) {
        const wins = [...winners, w];
        setLosers([...losers, l]);
        const [one, two, rem] = pickNext(wins);
        setFirst(one);
        setSecond(two);
        setWinners(rem);
      } else if (!gold && losers.length > 0) {
        setGold(w);
        const lose = [...losers, l];
        const [one, two, rem] = pickNext(lose);
        setFirst(one);
        setSecond(two);
        setLosers(rem);
      } else if (losers.length > 0) {
        const lose = [...losers, w];
        setSorted([...sorted, l]);
        const [one, two, rem] = pickNext(lose);
        setFirst(one);
        setSecond(two);
        setLosers(rem);
      } else {
        const s = (
          !!gold
            ? [...sorted, l, w, gold].reverse()
            : [...sorted, l, w].reverse()
        ).map((g, ind) => {
          return { ...g, sortOrder: ind };
        });
        setSorted(s);
        setFirst(null);
        setSecond(null);
        updateSort(s).then(() => {
          dispatch({ type: SET_SORTED });
        });
      }
    }
  }

  return (
    <React.Fragment>
      {!!first && !!second ? (
        <div className="flex flex-col flex-grow">
          <GameButton game={first} handleChoice={() => pick(first, second)} />
          <div className="text-center bg-blue-800 text-white font-extrabold">
            VS
          </div>
          <GameButton game={second} handleChoice={() => pick(second, first)} />
        </div>
      ) : null}
    </React.Fragment>
  );
}

function GameButton({ game, handleChoice }) {
  return (
    <button
      className="flex-grow flex items-center p-4 border-2 border-blue-800 rounded-lg m-1 bg-white"
      onClick={handleChoice}
    >
      <img className="max-h-24" src={game.boxArt} alt={game.title} />
      <div className="flex flex-col ml-5 w-full">
        <h4 className="text-xl font-semibold mb-2">{game.title}</h4>
        <p>{game.description}</p>
      </div>
    </button>
  );
}
function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function pickNext(arr) {
  let a = [...arr];
  let index = getRandomIndex(a);
  let one = a[index];
  a = [...a.slice(0, index), ...a.slice(index + 1)];
  index = getRandomIndex(a);
  let two = a[index];
  a = [...a.slice(0, index), ...a.slice(index + 1)];
  return [one, two, a];
}
