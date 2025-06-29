import React, { useState, useEffect } from "react";
import "./charList.scss";
import MarvelService from "../../services/marvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharList = ({ onCharSelected }) => {
  const [characters, setCharacters] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);

  const { loading, error, getAllCharacters } = MarvelService();

  useEffect(() => {
    getAllCharacters().then(onCharactersLoaded);
  }, []);

  const onCharactersLoaded = (response) => {
    setCharacters(response);
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 9, characters.length));
  };

  const renderItems = (arr) => {
    return arr.map((char) => {
      return (
        <li
          className="char__item"
          key={char.id}
          onClick={() => {
            console.log(char);
            onCharSelected(char.id);
          }}
        >
          <img src={`${char.thumbnail}`} alt={char.name} />
          <div className="char__name">{char.name}</div>
        </li>
      );
    });
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;

  const visibleCharacters = characters.slice(0, visibleCount);
  const content = !(loading || error) ? renderItems(visibleCharacters) : null;

  const isLoadMoreVisible = visibleCount < characters.length;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      <ul className="char__grid">{content}</ul>
      {isLoadMoreVisible && (
        <button className="button button__main button__long" onClick={loadMore}>
          <div className="inner">load more</div>
        </button>
      )}
    </div>
  );
};

export default CharList;
