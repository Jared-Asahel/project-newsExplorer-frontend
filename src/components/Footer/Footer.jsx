import Facebook from "../../imagenes/fb.svg";
import GitHub from "../../imagenes/github.svg";

const Footer = () => {
  return (
    <div className="footer">
      <p className="footer__paragraph">© 2021 Supersite, Powered by News API</p>
      <div className="footer__container">
        <p className="footer__text">Inicio</p>
        <p className="footer__text" style={{ marginLeft: "19px" }}>
          Practicum
        </p>
        <img
          src={GitHub}
          alt="Icono de github"
          className="footer__icon"
          style={{ marginLeft: "16px" }}
        />
        <img src={Facebook} alt="Icono de facebook" className="footer__icon" />
      </div>
    </div>
  );
};

export default Footer;
