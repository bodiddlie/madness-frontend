import React, { createContext, useContext } from 'react';
import { setupInterceptors } from './api';

import { useLocalStorage } from './use-local-storage';
import { signup as signUpApi, login } from './api';

const authContext = createContext(null);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useLocalStorage('FOCUS_USER', null);

  const signup = async (userEmail) => {
    await signUpApi(userEmail);
  };

  const signin = async (magicLink) => {
    console.log(`Signing in with magic link: ${magicLink}`);
    try {
      const loggedInUser = await login(magicLink);
      setUser(loggedInUser);
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signout = () => {
    setUser(null);
  };

  setupInterceptors(signout);

  return {
    user,
    signup,
    signin,
    signout,
  };
}
