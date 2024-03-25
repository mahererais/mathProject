import { Link } from 'react-router-dom';
import './Header.scss';
import LoginForm from './LoginForm/LoginForm';
import { useEffect, useState } from 'react';
import { api } from "../../Api/api";

import { toast, Bounce } from 'react-toastify';

const tokenKey = "mathToken";

function Header() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [pseudo, setPseudo] = useState("");

  const changeField = (value: string, name:string) => {
     if (name === "pseudo") {
      setEmail(value);
     }
     if (name === "password") {
      setPassword(value);
     } 
  }

  useEffect(() => {
    const name = api.getUserName();
    if (name) {
      setIsLogged(true);
      setPseudo(name);
    }
  }, [isLogged])

  const loginFormProps = {
    email: email,
    password: password,
    changeField: changeField ,
    handleLogin: () => {api.login},
    handleLogout: () => {
      setEmail(""); setPassword("");
      setIsLogged(false); setPseudo("")   
      localStorage.removeItem(tokenKey)
      toast.success('Deconnexion success !!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    },
    isLogged: isLogged,
    loggedMessage: pseudo ? `bienvenue ${pseudo}` : "",
    login: () => {api.login({email, password, setIsLogged})}
  } 

  return (
    <header className="header">
      <Link className='logo' to="/">
        Maths
      </Link>
      <LoginForm {...loginFormProps}></LoginForm>
    </header>
  );
}

export default Header;