import "./comicsList.scss";
import MarvelService from "../../services/marvelService";
import AppBanner from "../appBanner/AppBanner";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [comicsCount, setComicsCount] = useState(8);
  const { error, loading, getAllComics } = MarvelService();

  useEffect(() => {
    getAllComics().then(setComics);
  }, []);

  const changeComicsCount = (comicsCount) => {
    if (comicsCount + 4 <= 20) {
      setComicsCount(comicsCount + 4);
    } else {
      setComicsCount(20);
    }
  };

  return (
    <>
      <AppBanner />
      <div className="comics__list">
        <ul className="comics__grid">
          {comics.slice(0, comicsCount).map((item) => (
            <li className="comics__item" key={item.id}>
              <Link to={`/comics/${item.id}`}>
                <img
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  alt={item.title}
                  className="comics__item-img"
                />
                <div className="comics__item-name">
                  {item.title}:{item.description}
                </div>
                <div className="comics__item-price">
                  {item.prices[0].price
                    ? `${item.prices[0].price}$`
                    : "NOT AVAILABLE"}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {comicsCount < 20 && (
          <button
            className="button button__main button__long"
            onClick={() => changeComicsCount(comicsCount)}
          >
            <div className="inner">load more</div>
          </button>
        )}
      </div>
    </>
  );
};

export default ComicsList;
