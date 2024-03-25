import { FormEvent, useState } from "react";
import Field from "./Field/Field";

import "./LoginForm.scss";
import { FaList } from "react-icons/fa6";
import Scores from "../Scores/Scores";

import { IoMdExit } from "react-icons/io";


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

  const [isShowScores, setShowScore] = useState(false);

  const handleChangeField = (name: "pseudo" | "password") => (value: string) => {
    changeField(value, name);
  };

  const showScores = () => {
    setShowScore(value => !value);
  }

  return (
    <>
      <div className="login-form">
        {isLogged && (
          <div className="login-form-logged">
            <p className="login-form-message">{loggedMessage}</p>
            <button 
              type="button"
              onClick={showScores}
              style={{display: 'flex', placeContent: 'center', flexWrap: 'wrap', cursor: 'pointer'}}>
              <FaList style={{width: '18px', height: '18px'}}/>
            </button>
            <button
              type="button"
              className="login-form-button"
              onClick={handleLogout}
              style={{display: 'flex', placeContent: 'center', flexWrap: 'wrap', cursor: 'pointer'}}
            >
              <IoMdExit style={{width: '25px', height: '25px'}}/>
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
      {isShowScores && <Scores setShowScore={setShowScore}/>}
    </>

  );
}

LoginForm.defaultProps = {
  isLogged: false,
  loggedMessage: "Connecté",
};

export default LoginForm;