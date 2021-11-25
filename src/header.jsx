import React from 'react';
import { GiGamepadCross } from 'react-icons/gi';

import { useAuth } from './auth';

export default function Header() {
  const auth = useAuth();

  return (
    <div className="p-2 flex w-full justify-between bg-pale-cream">
      <div className="text-2xl text-red-700 flex items-center">
        <GiGamepadCross />
        <span>Pile of Shame</span>
      </div>
      {auth.user ? (
        <React.Fragment>
          <button type="button" onClick={() => auth.signout()}>
            Log Out
          </button>
        </React.Fragment>
      ) : null}
    </div>
  );
}
