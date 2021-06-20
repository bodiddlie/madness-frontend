import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router';

export default function PrivateRoute({ children, ...rest } : {children: JSX.Element}) {
  //let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !!false ? (
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