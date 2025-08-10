import { useState } from "react";
import { NavLink } from "react-router-dom";

const PopupRegister = ({ handleRegistration }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Dirección de correo electrónico no válida";
      }
    }

    if (name === "password") {
      if (value.length < 6) {
        error = "Mínimo 6 caracteres";
      }
    }

    if (name === "name") {
      if (value.trim().length < 2) {
        error = "Debe tener al menos 2 caracteres";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email" className="popup__label">
        Correo electronico
      </label>
      <div className="popup__wrapper">
        <input
          required
          id="email"
          type="email"
          className="popup__input"
          name="email"
          placeholder="Introduce tu correo electrónico"
          value={data.email}
          onChange={handleChange}
        />
        {errors.email && <span className="popup__error">{errors.email}</span>}
      </div>
      <label htmlFor="password" className="popup__label">
        Contraseña
      </label>
      <div className="popup__wrapper">
        <input
          required
          id="password"
          className="popup__input"
          placeholder="Introduce tu contraseña"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="popup__error">{errors.password}</span>
        )}
      </div>
      <label htmlFor="name" className="popup__label">
        Nombre de usuario
      </label>
      <div className="popup__wrapper">
        <input
          required
          id="name"
          className="popup__input"
          placeholder="Introduce tu nombre"
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
        />
        {errors.name && <span className="popup__error">{errors.name}</span>}
      </div>
      <button className="popup__button" type="submit">
        inscribirse
      </button>

      <p className="popup__spam" style={{ color: "black" }}>
        o{" "}
        <NavLink className="popup__spam" to="/signin">
          Inicia sesión
        </NavLink>
      </p>
    </form>
  );
};

export default PopupRegister;
