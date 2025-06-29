import { useState, useEffect } from "react";
import MarvelService from "../../services/marvelService";
import PropTypes from "prop-types";
import "./charInfo.scss";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null);

  const { getCharacter, loading, error } = MarvelService();

  useEffect(() => {
    if (!charId) {
      return;
    }

    getCharacter(charId).then((char) => {
      setChar(char);
    });
  }, [charId]);

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMsg = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMsg}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.map((item, i) => (
          <li key={i} className="char__comics-item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
