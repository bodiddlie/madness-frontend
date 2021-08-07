import React, { createContext, useContext } from 'react';
import { setupInterceptors } from './api';

import { User } from './types';
import { useLocalStorage } from './use-local-storage';
import { signup as signUpApi, login } from './api';

interface AuthContextType {
  user: User | null;
  signup(userEmail: String): void;
  signin(magicLink: String): Promise<boolean>;
  signout(): void;
}

const authContext = createContext<AuthContextType | null>(null);

export function ProvideAuth({ children }: { children: JSX.Element }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useLocalStorage('FOCUS_USER', null);

  const signup = (userEmail: String) => {
    console.log(`Signing up with email: ${userEmail}`);
    signUpApi(userEmail);
    // call api to send email and do nothing?
    // return promise of call?
  };

  const signin = async (magicLink: String) => {
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
