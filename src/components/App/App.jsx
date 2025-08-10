import MainPublic from "../MainPublic/MainPublic";
import MainPrivate from "../MainPrivate/MainPrivate";
import AuthContext from "../context/AuthContext";
import SavedContext from "../context/SavedContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import Popup from "../MainPublic/components/Popup/Popup";
import PopupLogin from "../MainPublic/components/Popup/PopupLogin/PopupLogin";
import PopupRegister from "../MainPublic/components/Popup/PopupRegister/PopupRegister";
import PopupConfirmation from "../MainPublic/components/Popup/PopupConfirmation/PopupConfirmation";
import PopupContext from "../context/PopupContext";

import { api } from "../../utils/api";
import { useState, useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "" });
  const [savedArticles, setSavedArticles] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const popupLogin = {
    title: "Iniciar sesión",
    children: <PopupLogin handleLogin={handleLogin} />,
  };

  const popupRegister = {
    title: "Inscribirse",
    children: <PopupRegister handleRegistration={handleRegistration} />,
  };

  const popupConfirmation = {
    title: "¡El registro se ha completado con éxito!",
    children: <PopupConfirmation />,
  };

  const [popup, setPopup] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (location.pathname === "/signin") {
      setPopup(popupLogin);
    } else if (location.pathname === "/signup") {
      setPopup(popupRegister);
    } else {
      setPopup(null);
    }
  }, [location.pathname]);

  function handleLogin({ email, password }) {
    api
      .login({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return api.getUserInfo(); // <- llamar aquí a /users/me
      })
      .then((userData) => {
        setCurrentUser({ name: userData.name });
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch(console.error);
  }

  function handleRegistration({ name, email, password }) {
    api
      .register({ name, email, password })
      .then(() => {
        setPopup(popupConfirmation);
        setTimeout(() => {
          navigate("/signin");
        }, 5000);
      })
      .catch(console.error);
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      api
        .getUserInfo()
        .then((userData) => {
          setCurrentUser({ name: userData.name });
          setIsLoggedIn(true);
        })
        .catch(() => {
          setIsLoggedIn(false);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getSavedArticles()
        .then((articles) => setSavedArticles(articles))
        .catch(console.error);
    }
  }, [isLoggedIn]);

  return (
    <>
      <PopupContext.Provider
        value={{
          setPopup,
          popupLogin,
          popupRegister,
          articles,
          setArticles,
          isLoading,
          setIsLoading,
          hasSearched,
          setHasSearched,
          setSearchKeyword,
          searchKeyword,
        }}
      >
        <AuthContext.Provider
          value={{ isLoggedIn, setIsLoggedIn, currentUser }}
        >
          <SavedContext.Provider value={{ savedArticles, setSavedArticles }}>
            <Routes>
              <Route
                path="/"
                element={
                  <MainPublic
                    onLogin={handleLogin}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    handleLogin={handleLogin}
                    handleRegistration={handleRegistration}
                  />
                }
              />

              <Route
                path="/signin"
                element={
                  <MainPublic
                    onLogin={handleLogin}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    handleLogin={handleLogin}
                  />
                }
              />

              <Route
                path="/signup"
                element={
                  <MainPublic
                    onLogin={handleLogin}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    handleRegistration={handleRegistration}
                  />
                }
              />

              <Route
                path="/articulos"
                element={
                  <ProtectedRoute>
                    <MainPrivate
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            {popup && (
              <Popup
                onClose={() => {
                  setPopup(null);
                  navigate("/");
                }}
                title={popup.title}
              >
                {popup.children}
              </Popup>
            )}
          </SavedContext.Provider>
        </AuthContext.Provider>
      </PopupContext.Provider>
    </>
  );
}

export default App;
