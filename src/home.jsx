import React from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from './auth';

export default function Home() {
  const auth = useAuth();

  return auth.user ? <Redirect to="/list" /> : <Redirect to="/login" />;
}
