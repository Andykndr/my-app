import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorPage from './ErrorPage';

export default function CharacterPage() {
  const params = useParams();
  const [char, setChar] = useState(null);

  const { error, clearError, getCharacter } = useMarvelService();

  useEffect(() => {
    onRequest();
  }, [params.id]);

  const onRequest = () => {
    clearError();
    getCharacter(params.id).then(onLoaded);
  };
  const onLoaded = (char) => {
    setChar(char);
  };

  const err = error ? <ErrorPage /> : null,
    content = !(error || !char) ? <View char={char} /> : null;

  return (
    <div>
      {err}
      {content}
    </div>
  );
}

const View = ({ char }) => {
  const { name, thumbnail, description } = char;

  return (
    <div>
      <h1>{name}</h1>
      <img src={thumbnail} alt={name} />
      <p>{description}</p>

      <Link to="/">Go home</Link>
    </div>
  );
};
