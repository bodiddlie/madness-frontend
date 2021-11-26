import React from 'react';

import { useAuth } from './auth';
import { Loading } from './loading';

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
          onLogin();
        }
      } else {
        window.history.replaceState({}, document.title, '/');
        onLogin();
      }
    }
    login();
  }, [magicLink, auth, onLogin]);

  return (
    <div className="flex flex-grow flex-col justify-center items-center p-2">
      <h1 className="mb-4">Logging in using magic link...</h1>
      <Loading />
    </div>
  );
}
