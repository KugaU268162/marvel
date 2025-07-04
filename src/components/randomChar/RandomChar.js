import "./randomChar.scss";
import thor from "../../resources/img/thor.jpeg";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelService from "../../services/marvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { useState, useEffect } from "react";

const RandomChar = () => {
  const [char, setChar] = useState({});

  const { loading, error, getCharacter } = MarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  const oneCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    const id = Math.floor(Math.random() * (21 - 1));
    getCharacter(id).then(oneCharLoaded);
  };

  const errorMsg = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      {errorMsg}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main">
          <div className="inner" onClick={updateChar}>
            try it
          </div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, homepage, wiki, thumbnail } = char;
  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
