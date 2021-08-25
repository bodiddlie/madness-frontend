import React from 'react';
import { MdMenu } from 'react-icons/md';

import { useAuth } from './auth';

export default function Header() {
  const auth = useAuth();

  return (
    <div className="p-2 flex w-full justify-between bg-blue-600">
      <MdMenu />
      {auth.user ? (
        <React.Fragment>
          <button type="button" onClick={() => auth.signout()}>
            Log Out
          </button>
        </React.Fragment>
      ) : (
        <div>Login</div>
      )}
    </div>
  );
}
