import React from 'react';

import { useAuth } from './auth';
import { getUserProfile } from './api';
import { FocusContainer } from './focus-container';
import { Login } from './login';
import { MagicLink } from './magic-link';
import { Loading } from './loading';

export default function Home({ magicLink }) {
  const [profile, setProfile] = React.useState(null);
  const [loggingIn, setLoggingIn] = React.useState(!!magicLink);
  const [showLogin, setShowLogin] = React.useState(false);
  const auth = useAuth();

  React.useEffect(() => {
    if (auth.user) {
      getUserProfile().then((profile) => {
        setProfile(profile);
      });
    }
  }, [auth.user]);

  const handleLogin = React.useCallback(() => {
    setLoggingIn(false);
  }, []);

  if (loggingIn) {
    return <MagicLink magicLink={magicLink} onLogin={handleLogin} />;
  }

  if (!auth.user && (!magicLink || !loggingIn)) {
    if (showLogin) {
      return <Login />;
    }

    return (
      <div className="flex flex-col p-2">
        <p className="mb-4 italic font-bold">
          With the ease of access to games that digital delivery provides and
          the ability to stock up on games in all the fantastic seasonal sales,
          it's harder than ever to decide which games you should play next.
        </p>
        <p className="mb-4 italic">
          Now with{' '}
          <span className="not-italic font-bold text-red-700">
            Pile of Shame
          </span>
          , you can pit your games against each other in a tournament to sort
          them. It's super easy to get started!
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <button
              type="button"
              className="py-1 px-3 text-white rounded-lg shadow-lg border self-end bg-blue-400 border-blue-400"
              onClick={() => setShowLogin(true)}
            >
              Request a Magic Login Link
            </button>
          </li>
          <li>Search for the games you haven't played yet</li>
          <li>Add games to your list</li>
          <li>Start a tournament</li>
          <li>Pick the winners of each match</li>
        </ul>
        <p className="mb-4 italic">
          After that, your choices of winners and losers will result in a sorted
          list of games. We'll present you with the next top game on your list,
          so you can maintain focus on you Pile of Shame (you can add new games
          to the end of the list).
        </p>
        <p className="text-xs italic">
          Icons provided by{' '}
          <a
            href="https://game-icons.net/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline"
          >
            https://game-icons.net/
          </a>
        </p>
      </div>
    );
  }

  return (
    <React.Fragment>
      {!profile ? (
        <div className="flex flex-grow flex-col justify-center items-center p-2">
          <Loading />
        </div>
      ) : (
        <FocusContainer profile={profile} />
      )}
    </React.Fragment>
  );
}
