import React from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  console.log('asd');

  return (
    <div style={{ textAlign: 'center' }}>
      <ErrorMessage />
      <h1>Oops!</h1>
      <p style={{ color: 'red' }}>Something went wrong.</p>
      <Link style={{ color: 'black', fontSize: 22 }} to="/">
        Go to homeage!
      </Link>
    </div>
  );
}
