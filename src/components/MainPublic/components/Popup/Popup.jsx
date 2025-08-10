import CloseIcon from "../../../../imagenes/CloseIcon.png";

const Popup = (props) => {
  const { title, children, onClose } = props;

  return (
    <div className="popup">
      <div className="popup__container">
        <img
          src={CloseIcon}
          alt="Boton para cerrar el popup"
          className="popup__button-close"
          onClick={onClose}
        />
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
};

export default Popup;
