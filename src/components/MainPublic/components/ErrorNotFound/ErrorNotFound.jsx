import Icon from "../../../../imagenes/not-found_v1.png";

const ErrorNotFound = () => {
  return (
    <div className="results__not-found">
      <img
        src={Icon}
        alt="Imagen de resultados no encontrados"
        className="results__icon"
      />
      <h3 className="results__title-error">No se encontró nada</h3>
      <p className="results__paragraph-error">
        Lo sentimos, pero no hay nada que coincida con tus términos de búsqueda.
      </p>
    </div>
  );
};

export default ErrorNotFound;
