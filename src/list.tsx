import React from 'react';
import { useAuth } from './auth';

export function List() {
  const auth = useAuth();

  return <div>This is the protected list page. - {auth?.user?.email}</div>;
}
