import React, { useContext } from 'react';
import './style/login.scss';
import { AuthContext } from '../context/AuthContext';
import { Helmet } from 'react-helmet';

export default function Login() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const submit = (e) => {
    e.preventDefault();
    setIsAuth(true);
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Login Marvel portal" />
        <title>Login : Marvel Portal</title>
      </Helmet>
      <form onSubmit={submit} className="form">
        <input type="text" placeholder="Login" className="input" />
        <input type="password" placeholder="password" className="input" />
        <button type="submit" className="button">
          Log In
        </button>
      </form>
    </>
  );
}
