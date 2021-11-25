import React from 'react';
import { useAuth } from './auth';
import { Loading } from './loading';

const initialState = {
  email: '',
  loading: false,
  showSuccess: false,
};

const EMAIL_UPDATE = 'EMAIL_UPDATE';
const REQUEST_LINK = 'REQUEST_LINK';
const LINK_SENT = 'LINK_SENT';

function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case EMAIL_UPDATE: {
      return { ...state, email: payload };
    }
    case REQUEST_LINK: {
      return { ...state, loading: true, showSuccess: false };
    }
    case LINK_SENT: {
      return { ...state, loading: false, showSuccess: true };
    }
    default: {
      return state;
    }
  }
}

export function Login() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const auth = useAuth();

  const handleChange = (event) => {
    dispatch({ type: EMAIL_UPDATE, payload: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: REQUEST_LINK });
    await auth.signup(state.email);
    dispatch({ type: LINK_SENT });
  };

  if (state.loading) {
    return (
      <div className="flex-grow flex flex-col p-2">
        <h1>Requesting magic link...</h1>
        <Loading />
      </div>
    );
  } else if (state.showSuccess) {
    return (
      <div className="flex-grow flex flex-col p-2">
        <h3>
          A magic link has been sent to {state.email}. Check your email and
          click the link to login!
        </h3>
      </div>
    );
  } else {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col p-2">
        <p className="mb-4 italic font-bold">
          Enter your email and we'll send you a "magic link" that you can use to
          log in. No accounts to create, no passwords to remember. Just use your
          email! Easy!
        </p>
        <label htmlFor="email" className="font-extrabold">
          Email Address
        </label>
        <input
          type="text"
          id="email"
          name="email"
          className="flex-1 py-4 px-2 mb-2 rounded-2xl bg-white appearance-none"
          placeholder="Enter your email..."
          value={state.email}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-24 p-1 bg-blue-400 rounded border border-blue-400 disabled:bg-gray-200"
        >
          Request Magic Link
        </button>
      </form>
    );
  }
}
