import Imagen from "../../imagenes/Yo.jpg";

const About = () => {
  return (
    <div className="about">
      <div className="about__container">
        <img src={Imagen} alt="Imagen del auntor" className="about__image" />
        <div className="about__container-text">
          <h2 className="about__title">Acerca del autor</h2>
          <p className="about__paragraph">
            Este bloque describe al autor del proyecto. Mi nombre es Jared
            Barranco, soy desarrollador web full stack con enfoque en
            JavaScript, React, Node.js y MongoDB. Me apasiona crear aplicaciones
            intuitivas y bien estructuradas.
          </p>
          <p className="about__paragraph">
            Durante mi formación en Practicum adquirí habilidades prácticas en
            desarrollo frontend y backend, trabajando en proyectos reales y
            colaborativos. Estoy preparado para ayudar a clientes potenciales a
            construir soluciones web modernas, escalables y accesibles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
