import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SingleComic = () => {
  const params = useParams();
  const [comic, setComic] = useState(null);
  const { loading, error, getComic } = useMarvelService();

  useEffect(() => {
    onRequest();
  }, [params.id]);

  const onRequest = () => {
    getComic(params.id).then(onLoaded);
  };

  const onLoaded = (comic) => {
    setComic(comic);
  };

  const load = loading ? <Spinner /> : null,
    err = error ? <ErrorMessage /> : null,
    item = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <div className="single-comic">
      {load}
      {err}
      {item}

      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

const View = ({ comic }) => {
  const { id, title, thumbnail, price, description } = comic;

  return (
    <>
      <Helmet>
        <meta name="description" content={`${title} - comics book`} />
        <title>{title}</title>
      </Helmet>
      <img src={thumbnail} alt="x-men" className="single-comic__img" />

      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">144 pages</p>
        <p className="single-comic__descr">Language: en-us</p>
        <div className="single-comic__price">{price}</div>
      </div>
    </>
  );
};

export default SingleComic;
