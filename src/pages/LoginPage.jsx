import React, { useState } from "react";
import { toast } from "react-toastify";
import { emailValidator, setLogIn } from "../utility/utils";

const LoginPage = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [isSending, setSending] = useState(false);

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let errors = false;

    if (data.username.trim() === "" || data.password.trim() === "") {
      toast.error("Todos los campos son requeridos");
      errors = true;
    }

    if (!emailValidator(data.username)) {
      toast.error("El correo electrónico ingresado no es válido");
      errors = true;
    }

    if (!errors) {
      setSending(true);
      const response = await setLogIn(data);
      setSending(false);
    }
  };

  return (
    <>
      {isSending && <div className="loading-bar" />}
      <div className="login-page">
        <h1>Iniciar Sesión</h1>
        <div className="login-form">
          <form>
            <div className="form-control">
              <label htmlFor="username">Correo electrónico</label>
              <input
                type="username"
                name="username"
                autoComplete="off"
                placeholder="email@example.cl"
                onChange={onChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="password">Contraseña</label>
              <input type="password" name="password" onChange={onChange} />
            </div>
            <button type="submit" onClick={handleLogin}>
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
