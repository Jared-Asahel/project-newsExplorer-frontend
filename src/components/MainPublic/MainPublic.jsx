import Header from "../Header/Header";
import Search from "../Search/Search";
import About from "../About/About";
import Footer from "../Footer/Footer";
import PopupContext from "../context/PopupContext";
import { useContext } from "react";
import { useEffect } from "react";
import Results from "../Results/Results";

const MainPublic = ({ isLoggedIn, setIsLoggedIn }) => {
  const { hasSearched } = useContext(PopupContext);

  useEffect(() => {
    localStorage.removeItem("articles");
  }, []);

  return (
    <>
      <Header
        setPopup={() => {
          setPopup(popupLogin);
        }}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Search />
      {hasSearched && <Results />}
      <About />
      <Footer />
    </>
  );
};

export default MainPublic;
