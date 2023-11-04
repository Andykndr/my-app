import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';

export default function SinglePage({ Component, dataType }) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { loading, error, getCharacter, getComic, clearError } =
    useMarvelService();

  useEffect(() => {
    updateDate();
  }, [id]);

  const updateDate = () => {
    clearError();

    switch (dataType) {
      case 'character':
        getCharacter(id).then(onDataLoaded);
        break;
      case 'comic':
        getComic(id).then(onDataLoaded);
        break;
      default:
        console.log('Invalid data type');
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  const load = loading ? <Spinner /> : null,
    err = error ? <ErrorMessage /> : null,
    content = !(loading || error || !data) ? <Component data={data} /> : null;

  return (
    <>
      <AppBanner />
      {err}
      {load}
      {content}
    </>
  );
}
