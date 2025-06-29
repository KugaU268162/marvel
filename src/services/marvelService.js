import { useHttp } from "../hooks/http.hook";

const MarvelService = () => {
  const { request, loading, error } = useHttp(); 
  const _apiBase = "https://marvel-server-zeta.vercel.app/";
  const _apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df";

  const getAllComics = async () => {
    const res = await request(`${_apiBase}comics?${_apiKey}`);
    return res.data.results;
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return res.data.results;
  };

  const getAllCharacters = async () => {
    const res = await request(`${_apiBase}characters?${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (char) => ({
    name: char.name,
    description: char.description || "Описание отсутствует",
    thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
    homepage: char.urls?.[0]?.url || "#",
    wiki: char.urls?.[1]?.url || "#",
    comics: char.comics.items,
    id: char.id,
  });

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
  };
};

export default MarvelService;
