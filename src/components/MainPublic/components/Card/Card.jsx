import Icon from "../../../../imagenes/bookmark.png";
import IconBlue from "../../../../imagenes/bookmark-2.png";
import IconDelete from "../../../../imagenes/trash.png";
import AuthContext from "../../../context/AuthContext";
import SavedContext from "../../../context/SavedContext";
import { useState, useContext } from "react";
import PopupContext from "../../../context/PopupContext";
import { api } from "../../../../utils/api";

const Card = ({ article, saved, notSaved, keyword }) => {
  const [showExtra, setShowExtra] = useState(false);
  const { setPopup, popupLogin, searchKeyword } = useContext(PopupContext);
  const { savedArticles, setSavedArticles } = useContext(SavedContext);
  const { isLoggedIn } = useContext(AuthContext);
  const articleLink = article.link || article.url;

  const isSaved = savedArticles.some((item) => item.link === articleLink);

  const usedKeyword = article.keyword || searchKeyword || "general";

  const handleSaveOrDelete = () => {
    if (isSaved) {
      const articleToDelete = savedArticles.find(
        (item) => item.title === article.title
      );
      api
        .deleteArticle(articleToDelete._id)
        .then(() => {
          setSavedArticles((prev) =>
            prev.filter((item) => item._id !== articleToDelete._id)
          );
        })
        .catch(console.error);
    } else {
      // Transformar article para cumplir validación backend
      const transformedArticle = {
        keyword: usedKeyword,
        title: article.title || "Sin título",
        text: article.description || article.content || "Sin contenido",
        date: article.publishedAt || new Date().toISOString(),
        source: article.source?.name || "Desconocido",
        link:
          article.url && article.url.startsWith("http")
            ? article.url
            : "https://default.com",
        image:
          article.urlToImage && article.urlToImage.startsWith("http")
            ? article.urlToImage
            : "https://default.com/image.jpg",
      };
      api
        .createArticle(transformedArticle)
        .then((savedArticle) => {
          setSavedArticles((prev) => [...prev, savedArticle]);
        })
        .catch(console.error);
    }
  };

  const handleMouseEnter = () => {
    setShowExtra(true); // ← mostramos el botón extra solo si no ha iniciado sesión
  };

  const handleMouseLeave = () => {
    setShowExtra(false); // ← ocultamos el botón extra siempre al salir
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="card">
      <div
        className="card__container-buttons"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {saved && !isLoggedIn && showExtra && (
          <button
            className="card__popup-button"
            onClick={() => {
              setPopup(popupLogin);
            }}
          >
            <p className="card__popup-text">
              Inicia sesión para guardar artículos
            </p>
          </button>
        )}

        {saved && (
          <button className="card__button" onClick={handleSaveOrDelete}>
            <img
              src={isSaved ? IconBlue : Icon}
              alt="Boton de guardar tarjeta"
              className="card__button-icon"
            />
          </button>
        )}

        {notSaved && showExtra && (
          <button className="card__popup-button" onClick={handleSaveOrDelete}>
            <p className="card__popup-text">Quitar de guardado</p>
          </button>
        )}

        {notSaved && (
          <button className="card__button" onClick={handleSaveOrDelete}>
            <img
              src={IconDelete}
              alt="Boton de eliminar tarjeta"
              className="card__button-icon"
            />
          </button>
        )}
      </div>
      {notSaved && (
        <button className="card__popup-search">
          <p className="card__popup-text">{usedKeyword}</p>
        </button>
      )}

      <div className="card__container-image">
        <img
          src={article.image || article.urlToImage}
          alt={article.title}
          className="card__image"
        />
      </div>
      <div className="card__container-text">
        <p className="card__date">
          {formatDate(article.date || article.publishedAt)}
        </p>
        <h2 className="card__title">{article.title}</h2>
        <p className="card__paragraph">{article.text || article.description}</p>
        <p className="card__autor">
          {article.source?.name || article.source || "Desconocido"}
        </p>
      </div>
    </div>
  );
};

export default Card;
