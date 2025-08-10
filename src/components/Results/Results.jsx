import Card from "../MainPublic/components/Card/Card";
import { useState, useContext } from "react";
import Preloader from "../MainPublic/components/Preloader/Preloader";
import PopupContext from "../context/PopupContext";
import ErrorNotFound from "../MainPublic/components/ErrorNotFound/ErrorNotFound";

const Results = () => {
  const [visibleCards, setVisibleCards] = useState(3); // mostramos inicialmente 3
  const { isLoading } = useContext(PopupContext);
  const { articles } = useContext(PopupContext);

  const handleShowMore = () => {
    setVisibleCards((prev) => prev + 9); // añade 9 tarjetas más
  };

  if (isLoading) {
    return (
      <div className="results">
        <Preloader />
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="results">
        <ErrorNotFound />
      </div>
    );
  }

  return (
    <div className="results">
      <h2 className="results__title">Resultados de la búsqueda</h2>
      <div className="results__container">
        {articles.slice(0, visibleCards).map((article, index) => (
          <Card key={index} article={article} saved />
        ))}
      </div>
      {visibleCards < articles.length && (
        <button className="results__button" onClick={handleShowMore}>
          Ver más
        </button>
      )}
    </div>
  );
};
export default Results;
