import { FormEvent } from "react";
import Field from "./Field/Field";

import "./LoginForm.scss";

interface LoginFormProps {
  email: string;
  password: string;
  changeField: (value: string, name: "pseudo" | "password") => void;
  handleLogin: () => void;
  handleLogout: () => void;
  isLogged?: boolean;
  loggedMessage?: string;
  login: () => void
}
function LoginForm({ 
  email,
  password,
  changeField,
  handleLogin,
  handleLogout,
  isLogged,
  loggedMessage,
  login
}: LoginFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
  };

  const handleChangeField = (name: "pseudo" | "password") => (value: string) => {
    changeField(value, name);
  };

  return (
    <div className="login-form">
      {isLogged && (
        <div className="login-form-logged">
          <p className="login-form-message">{loggedMessage}</p>
          <button
            type="button"
            className="login-form-button"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </div>
      )}
      {!isLogged && (
        <form
          autoComplete="off"
          className="login-form-element"
          onSubmit={handleSubmit}
        >
          <Field
            placeholder="Pseudo"
            onChange={handleChangeField("pseudo")}
            value={email}
          />
          <Field
            type="password"
            placeholder="Mot de passe"
            onChange={handleChangeField("password")}
            value={password}
          />
          <button type="submit" className="login-form-button" onClick={login}>
            OK
          </button>
        </form>
      )}
    </div>
  );
}

LoginForm.defaultProps = {
  isLogged: false,
  loggedMessage: "Connecté",
};

export default LoginForm;