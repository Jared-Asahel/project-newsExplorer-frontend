import { useState } from "react";
import { NavLink } from "react-router-dom";

const PopupLogin = ({ handleLogin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
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
    handleLogin(data);
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
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
          placeholder="Introduce tu correo electronico"
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
      <button className="popup__button" type="submit">
        Iniciar sesión
      </button>

      <p className="popup__spam" style={{ color: "black" }}>
        o{" "}
        <NavLink className="popup__spam" to="/signup">
          inscribirse
        </NavLink>
      </p>
    </form>
  );
};

export default PopupLogin;
