import React from 'react';
import { useAuth } from './auth';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [showSuccess, setShowSuccess] = React.useState(false);
  const auth = useAuth();

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await auth.signup(email);
    setShowSuccess(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border border-blue-600 p-1"
          value={email}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {showSuccess ? (
        <div>
          <h3>
            A magic link has been sent to {email}. Check your email and click
            the link to login!
          </h3>
        </div>
      ) : null}
    </div>
  );
}
