import PopupContext from "../../context/PopupContext.js";
import { useState, useContext } from "react";
import { fetchNewsArticles } from "../../../utils/newsApi.js";

const SearchBar = () => {
  const [query, setQuery] = useState(""); // <-- Manejamos el input
  const { setArticles, setIsLoading, setHasSearched, setSearchKeyword } =
    useContext(PopupContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);
    setSearchKeyword(query);

    try {
      const articles = await fetchNewsArticles(query); // <--- Nuevo uso de función externa
      setArticles(articles);
      localStorage.setItem("articles", JSON.stringify(articles));
    } catch (err) {
      throw new Error("Error al conectar con el servidor."); // ← Aquí lo relanzas
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="search__bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Introduce un tema"
        className="search__input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search__button">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
