import React from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from './auth';
import { getUserProfile } from './api';

export default function Home() {
  const [profile, setProfile] = React.useState(null);
  const auth = useAuth();

  React.useEffect(() => {
    if (auth.user) {
      getUserProfile().then((profile) => {
        setProfile(profile);
      });
    }
  }, [auth.user]);

  if (!auth.user) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      {!profile ? (
        <div>Loading...</div>
      ) : (
        <React.Fragment>
          {profile.isSorted ? (
            <Redirect to="/focus" />
          ) : (
            <Redirect to="/list" />
          )}
        </React.Fragment>
      )}
    </div>
  );
}
