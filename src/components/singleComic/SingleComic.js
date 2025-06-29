import "./singleComic.scss";
import MarvelService from "../../services/marvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const SingleComic = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);
  const { loading, error, getComic } = MarvelService();

  useEffect(() => {
    if (!comicId) {
      return;
    }

    getComic(comicId).then((data) => {
      setComic(data);
    });
  }, [comicId]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (!comic) {
    return null;
  }

  console.log(comic);

  return (
    <div className="single-comic">
      <img
        src={`${comic[0].thumbnail.path}.jpg`}
        alt={comic[0].title}
        className="single-comic__img"
      />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{comic[0].title}</h2>
        <p className="single-comic__descr">{comic[0].description}</p>
        <p className="single-comic__descr">Page count: {comic[0].pageCount}</p>
        <p className="single-comic__descr">
          Language: {comic[0].textObjects.languages}
        </p>
        <div className="single-comic__price">{comic[0].prices[0].price}$</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComic;
