import useHttp from '../hooks/http.hook';

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=163cf2a9b7b2a915cdbed6bd22dc874e';

  const _baseOffset = 210;
  const _baseComicsOffset = 71;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getCharacterByName = async (name) => {
    const res = await request(
      `${_apiBase}characters?nameStartsWith=${name}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getAllComics = async (offset = _baseComicsOffset) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      title: comics.title,
      price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'No price',
      urls: comics.urls[0].url,
      description: comics.description,
    };
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : 'There is no description for this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    clearError,
    getAllComics,
    getComic,
    getCharacterByName,
  };
};

export default useMarvelService;
