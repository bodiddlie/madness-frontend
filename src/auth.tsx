import React, {createContext, useContext} from 'react';

import {User} from './types';
import {useLocalStorage} from './use-local-storage';

interface AuthContextType {
	user: User | null,
	signup(userEmail: String): void
}

const authContext = createContext<AuthContextType | null>(null);

export function ProvideAuth({children}: {children: JSX.Element}) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export function useAuth() {
	return useContext(authContext);
}

function useProvideAuth() {
	const [user, setUser] = useLocalStorage('FOCUS_USER', null);

	const signup = (userEmail: String) => {
		console.log(`Signing up with email: ${userEmail}`);
		// call api to send email and do nothing?
		// return promise of call?
	}

	const signin = (magicLink: String) => {
		console.log(`Signing in with magic link: ${magicLink}`);
		// call login api with magic link token
		// when promise resolves set jwt in localStorage
		// set user info in context
	}

	const signout = () => {
			// clear local storage JWT
			// set user in context to null
	}

	return {
		user,
		signup
	}
}