import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Elise from "../../imagenes/logout.png";
import EliseBlack from "../../imagenes/logout-black.png";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Header = ({ setPopup, isLoggedIn, setIsLoggedIn, searchResults }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const singOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={`header ${searchResults ? "header-search" : ""}`}>
      <div className="header__container">
        <div className="header__title-container">
          <h2
            className={`header__title ${
              searchResults ? "header__title_search" : ""
            } ${isMenuOpen ? "header__title_popup" : ""}`}
          >
            NewsExplorer
          </h2>
          {/* Botón cerrar solo visible en menú abierto */}
          {isMenuOpen && (
            <button className="header__popup-close" onClick={toggleMenu}>
              ✕
            </button>
          )}
        </div>

        {/* Botones normales (ocultos en 660px o menos) */}
        <div className="header__container-buttons">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `header__container-start${isActive ? " active" : ""}${
                searchResults ? " header__container-start_search" : ""
              }`
            }
          >
            Inicio
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/articulos"
              className={({ isActive }) =>
                `header__container-start${isActive ? " active" : ""}${
                  searchResults ? " header__container-start_search" : ""
                }`
              }
            >
              Artículos guardados
            </NavLink>
          )}
          {isLoggedIn ? (
            <button
              className={`header__button-login${
                searchResults ? " header__button-login_search" : ""
              }`}
              onClick={singOut}
            >
              {currentUser.name}
              <img
                src={searchResults ? EliseBlack : Elise}
                alt="Cerrar sesión"
                className="header__icon"
              />
            </button>
          ) : (
            <NavLink to="/signin" className="header__button-login">
              Iniciar sesión
            </NavLink>
          )}
        </div>

        {/* Botón hamburguesa visible en 660px o menos */}
        <button
          className="header__burger"
          onClick={toggleMenu}
          style={{
            color: location.pathname === "/articulos" ? "black" : "white",
          }}
        >
          ☰
        </button>
      </div>

      {/* Menú emergente */}
      {isMenuOpen && (
        <div className="header__popup-menu">
          <NavLink to="/" onClick={toggleMenu} className="header__popup-link">
            Inicio
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/articulos"
              onClick={toggleMenu}
              className="header__popup-link"
            >
              Artículos guardados
            </NavLink>
          )}
          {isLoggedIn ? (
            <button
              onClick={() => {
                singOut();
                toggleMenu();
              }}
              className="header__button-login"
            >
              Cerrar sesión
            </button>
          ) : (
            <NavLink
              to="/signin"
              onClick={toggleMenu}
              className="header__button-login"
            >
              Iniciar sesión
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
