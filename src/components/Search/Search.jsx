import SearchBar from "./SearchBar/SearchBar";

const Search = () => {
  return (
    <div className="search">
      <div className="search__container">
        <h2 className="search__title">¿Qué está pasando en el mundo?</h2>
        <p className="search__paragraph">
          Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu
          cuenta personal.
        </p>
        <SearchBar />
      </div>
    </div>
  );
};

export default Search;
