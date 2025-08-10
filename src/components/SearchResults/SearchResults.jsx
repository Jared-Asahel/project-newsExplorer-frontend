import SavedContext from "../context/SavedContext";
import { useContext } from "react";

const SearchResults = () => {
  const { savedArticles } = useContext(SavedContext);

  // Extraer keywords únicas
  const uniqueKeywords = [
    ...new Set(savedArticles.map((article) => article.keyword)),
  ];

  // Generar el texto dinámico
  let keywordText = "";
  if (uniqueKeywords.length === 1) {
    keywordText = uniqueKeywords[0];
  } else if (uniqueKeywords.length === 2) {
    keywordText = `${uniqueKeywords[0]}, ${uniqueKeywords[1]}`;
  } else if (uniqueKeywords.length > 2) {
    keywordText = `${uniqueKeywords[0]}, ${uniqueKeywords[1]} y ${
      uniqueKeywords.length - 2
    } más`;
  }

  return (
    <div className="search-results">
      <p className="search-results__paragraph">Artículos guardados</p>
      <h2 className="search-results__title">
        Elise, tienes {savedArticles.length} artículos guardados
      </h2>
      {uniqueKeywords.length > 0 && (
        <p className="search-results__key">
          Por palabras clave: <strong>{keywordText}</strong>
        </p>
      )}
    </div>
  );
};

export default SearchResults;
