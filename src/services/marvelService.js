class MarvelService {
  _apiBase = "https://marvel-server-zeta.vercel.app/";
  _apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df";

  getResourse = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAll = () => {
    return this.getResourse(
      "https://marvel-server-zeta.vercel.app/characters?apikey=d4eecb0c66dedbfae4eab45d312fc1df"
    );
  };

  getAllCharacters = async () => {
    const res = await this.getResourse(
      `${this._apiBase}/characters?${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResourse(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description || "Описание отсутствует",
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls?.[0]?.url || "#",
      wiki: char.urls?.[1]?.url || "#",
      comics: char.comics.items,
    };
  };
}

export default MarvelService;
