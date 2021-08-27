import React, { useState, useEffect } from 'react';

export function Bracket({ pile }) {
  const [remaining, setRemaining] = useState([]);
  const [winners, setWinners] = useState([]);
  const [losers, setLosers] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [gold, setGold] = useState(null);

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
        const s = !!gold
          ? [...sorted, l, w, gold].reverse()
          : [...sorted, l, w].reverse();
        setSorted(s);
        setFirst(null);
        setSecond(null);
        console.log('sorted: ');
        console.table(s);
        // dispatch({ type: 'sort', sorted: s });
      }
    }
  }

  return (
    <div>
      {!!first && !!second ? (
        <div>
          <button onClick={() => pick(first, second)}>{first.title}</button>
          <br />
          <button onClick={() => pick(second, first)}>{second.title}</button>
        </div>
      ) : null}
    </div>
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
