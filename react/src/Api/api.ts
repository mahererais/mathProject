import { toast, Bounce } from 'react-toastify';

const tokenKey = "mathToken";

type PropsLogin = {
    email: string;
    password: string;
    setIsLogged: (value: boolean) => void;
}

export const api = {

    login : ({email, password, setIsLogged}: PropsLogin) => {
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
            if (d.token) {
              setIsLogged(true);
              localStorage.setItem(tokenKey, d.token)
              toast.success('Connexion success !!', {
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
            }
          }
        }
      )
    },

    sendScore: (score: number, equations: string[]) => {
      const token = localStorage.getItem(tokenKey);
      fetch("http://localhost:8080/api/scores/add", { 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token ?? ''}`
        },
        method: "POST",
        body: JSON.stringify(
          {
            user: 40,
            leaderboard: 25,
            score: score,
            equations: equations,
            timer: (new Date()).toISOString()
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
            localStorage.setItem(tokenKey, d.token)
            toast.info('send score success !!', {
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
          } else {
            toast.error('send score failed !!', {
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
          }
        }
      )
    },

    getUserName: () => {
      const token = localStorage.getItem(tokenKey);
      console.log(token);
      if (!token) {
       return undefined;
      } else {
        const jsonPayload = decodeURIComponent(
          atob(
            token!
            .split('.')[1]
            .replace('-', '+')
            .replace('_', '/'))
            .split('')
            .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
    
        return JSON.parse(jsonPayload).username ?? "";
      }
  }
}