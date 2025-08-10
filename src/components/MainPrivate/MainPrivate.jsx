import Header from "../Header/Header";
import SearchResults from "../SearchResults/SearchResults";
import SavedArticles from "./SavedArticles/SavedArticles";
import Footer from "../Footer/Footer";

const MainPrivate = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        searchResults
      />
      <SearchResults />
      <SavedArticles />
      <Footer />
    </>
  );
};

export default MainPrivate;
