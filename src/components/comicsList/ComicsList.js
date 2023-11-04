import './comicsList.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(71);
  const [endPage, setEndPage] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, init) => {
    init ? setIsLoading(false) : setIsLoading(true);
    getAllComics(offset).then(onLoaded);
  };

  const onLoaded = (newComics) => {
    let ended = false;
    if (newComics.length < 8) {
      ended = true;
    }
    setComics((comics) => [...comics, ...newComics]);
    setIsLoading(false);
    setOffset((offset) => offset + 8);
    setEndPage(ended);
  };

  function renderItems(arr) {
    const items = arr.map((item) => {
      return (
        <li key={item.id} className="comics__item">
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt="x-men"
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.name}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });
    return <ul className="comics__grid">{items}</ul>;
  }

  const items = renderItems(comics);
  const load = loading && !isLoading ? <Spinner /> : null,
    err = error ? <ErrorMessage /> : null;

  return (
    <div className="comics__list">
      {load}
      {err}
      {items}
      <button
        disabled={isLoading}
        style={{ display: endPage ? 'none' : 'block' }}
        onClick={() => onRequest(offset)}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
