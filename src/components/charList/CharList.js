import React, { Component } from "react";
import "./charList.scss";
import MarvelService from "../../services/marvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
  state = {
    characters: [],
    visibleCount: 9,
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.marvelService
      .getAll()
      .then(this.onCharactersLoaded)
      .catch(this.onError);
  }

  onCharactersLoaded = (response) => {
    this.setState({
      characters: response.data.results,
      loading: false,
      error: false,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  loadMore = () => {
    this.setState(({ visibleCount, characters }) => {
      const newCount = Math.min(visibleCount + 9, characters.length);
      return { visibleCount: newCount };
    });
  };

  renderItems = (arr) => {
    return arr.map((char) => {
      return (
        <li
          className="char__item"
          key={char.id}
          onClick={() => this.props.onCharSelected(char.id)}
        >
          <img
            src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
            alt={char.name}
          />
          <div className="char__name">{char.name}</div>
        </li>
      );
    });
  };

  render() {
    const { characters, visibleCount, loading, error } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    const visibleCharacters = characters.slice(0, visibleCount);
    const content = !(loading || error)
      ? this.renderItems(visibleCharacters)
      : null;

    const isLoadMoreVisible = visibleCount < characters.length;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        <ul className="char__grid">{content}</ul>
        {isLoadMoreVisible && (
          <button
            className="button button__main button__long"
            onClick={this.loadMore}
          >
            <div className="inner">load more</div>
          </button>
        )}
      </div>
    );
  }
}

export default CharList;
