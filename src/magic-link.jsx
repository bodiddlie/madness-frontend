import React from 'react';
import { useLocation, useHistory } from 'react-router';

import { useAuth } from './auth';

export function MagicLink() {
  const history = useHistory();
  const query = useQuery();
  const auth = useAuth();

  const magicLink = query.get('magicLink');

  React.useEffect(() => {
    async function login() {
      if (magicLink && !auth.user) {
        try {
          await auth.signin(magicLink);
          history.replace({ pathname: '/list' });
        } catch (error) {
          console.error(error);
          history.replace({ pathname: '/login' });
        }
      }
    }
    login();
  }, [magicLink, auth, history]);

  return <div>Logging in...</div>;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
