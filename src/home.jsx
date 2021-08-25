import React from 'react';

import { useAuth } from './auth';
import { getUserProfile } from './api';
import { FocusContainer } from './focus-container';
import { Login } from './login';
import { MagicLink } from './magic-link';

export default function Home({ magicLink }) {
  const [profile, setProfile] = React.useState(null);
  const [loggingIn, setLoggingIn] = React.useState(!!magicLink);
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
    return <Login />;
  }

  return (
    <div>
      {!profile ? <div>Loading...</div> : <FocusContainer profile={profile} />}
    </div>
  );
}
