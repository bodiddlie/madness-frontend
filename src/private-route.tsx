import React from 'react';
import { Route, Redirect } from 'react-router';
import {useAuth} from './auth';

export default function PrivateRoute({ children, path, ...rest } : {children: JSX.Element, path: String}) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth?.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}