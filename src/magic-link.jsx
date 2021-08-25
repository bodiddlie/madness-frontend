import React from 'react';

import { useAuth } from './auth';

export function MagicLink({ magicLink, onLogin }) {
  const auth = useAuth();

  React.useEffect(() => {
    async function login() {
      if (magicLink && !auth.user) {
        try {
          await auth.signin(magicLink);
          window.history.replaceState({}, document.title, '/');
          onLogin();
        } catch (error) {
          console.error(error);
          window.history.replaceState({}, document.title, '/login');
          onLogin();
        }
      }
    }
    login();
  }, [magicLink, auth, onLogin]);

  return <div>Logging in...</div>;
}
