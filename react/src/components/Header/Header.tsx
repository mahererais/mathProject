import { Link } from 'react-router-dom';
import './Header.scss';
import LoginForm from './LoginForm/LoginForm';
import { useState } from 'react';

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

  const login = () => {
    fetch("http://localhost:8080/api/login_check", { 
      headers: {
                "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(
        {
          username: email,
          password: password
        }
      )
    })
    .then(r => {
      console.log(r);
      if (r.ok  == false) 
        return 
      
      return r.json();
    })
    .then(d => {
        if (d != null) {
          console.log(d);
          setIsLogged(true);
        }
      }
    )
  }

  const loginFormProps = {
    email: email,
    password: password,
    changeField: changeField ,
    handleLogin: () => {login},
    handleLogout: () => {
      setEmail(""); setPassword("");
      setIsLogged(false); setPseudo("")    
    },
    isLogged: isLogged,
    loggedMessage: pseudo ? `bienvenue ${pseudo}` : "",
    login
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