import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Spinner from "../spinner/spinner";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import decoration from "../../resources/img/vision.png";

// Lazy-loaded components
const AppHeader = lazy(() => import("../appHeader/AppHeader"));
const RandomChar = lazy(() => import("../randomChar/RandomChar"));
const CharList = lazy(() => import("../charList/CharList"));
const CharInfo = lazy(() => import("../charInfo/CharInfo"));
const ComicsList = lazy(() => import("../comicsList/ComicsList"));
const SingleComic = lazy(() => import("../singleComic/SingleComic"));
const Page404 = lazy(() => import("../errorPage/404"));

const MainPage = ({ onCharSelected, selectedChar }) => (
  <>
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <RandomChar />
      </Suspense>
    </ErrorBoundary>
    <div className="char__content">
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <CharList onCharSelected={onCharSelected} />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <CharInfo charId={selectedChar} />
        </Suspense>
      </ErrorBoundary>
    </div>
    <img className="bg-decoration" src={decoration} alt="vision" />
  </>
);

const App = () => {
  const [selectedChar, setChar] = useState(1);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <Router>
      <div className="app">
        <Suspense fallback={<Spinner />}>
          <AppHeader />
        </Suspense>
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route
                path="/"
                element={
                  <MainPage
                    selectedChar={selectedChar}
                    onCharSelected={onCharSelected}
                  />
                }
              />
              <Route
                path="/comics"
                element={
                  <Suspense fallback={<Spinner />}>
                    <ComicsList />
                  </Suspense>
                }
              />
              <Route
                path="/comics/:comicId"
                element={
                  <Suspense fallback={<Spinner />}>
                    <SingleComic />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<Spinner />}>
                    <Page404 />
                  </Suspense>
                }
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
