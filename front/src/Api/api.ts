import { toast, Bounce, ToastOptions } from 'react-toastify';

const tokenKey = "mathToken";

const host = import.meta.env.VITE_host;

type PropsLogin = {
    email: string;
    password: string;
    setIsLogged: (value: boolean) => void;
}

export const api = {
    
    login : ({email, password, setIsLogged}: PropsLogin) => {
      const notificationOptions: ToastOptions = 
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          };

      fetch(`http://${host}/api/login_check`, { 
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
        if (r.ok  == false) {
          return null
        }
        
        return r.json();
      })
      .then(d => {
          if (d != null) {
            console.log(d);
            if (d.token) {
              setIsLogged(true);
              localStorage.setItem(tokenKey, d.token)
              toast.success('Connexion success !!', notificationOptions);
            }
          } else{ 
            toast.error('Connexion failed !!', notificationOptions);

          }
        }
      )
    },

    sendScore: (score: number, equations: string[]) => {
      const token = localStorage.getItem(tokenKey);
      const userId = api.isTokenUserID(token ?? "");
      const notificationFailed = () => {
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
<<<<<<< Updated upstream
      if (userId && token) {
=======
      if (userId) { // !! first user id begin with number 1
>>>>>>> Stashed changes
        fetch(`http://${host}/api/scores/add`, { 
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token ?? ''}`
          },
          method: "POST",
          body: JSON.stringify(
            {
              user: userId,
              leaderboard: 1,
              score: score,
              equations: equations,
              timer: (new Date()).toISOString()
            }
          )
        })
        .then(r => {
          //console.log(r);
          if (r.ok  == false) 
            return 
          
          return r.json();
        })
        .then(d => {
            if (d != null) {
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
              notificationFailed()
            }
          })
      }
    },

    isTokenExpired: (token: string) => {
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
    },

    isTokenUserID: (token: string) => {
      return token ? (JSON.parse(atob(token.split('.')[1]))).id : null;
    },

    getUserName: () => {
      const token = localStorage.getItem(tokenKey) as string;
      if (!token || token == "undefined" || token && api.isTokenExpired(token)) {
        localStorage.removeItem(tokenKey)
        return "";
      }
      // console.log(token);
      if (!token || token == "undefined") {
       return undefined;
      } else {
        // const jsonPayload = decodeURIComponent(
        //   atob(
        //     token!
        //     .split('.')[1]
        //     .replace('-', '+')
        //     .replace('_', '/'))
        //     .split('')
        //     .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
    
        // return JSON.parse(jsonPayload).username ?? "";

        return (JSON.parse(atob(token.split('.')[1]))).username ?? "";
      }
    },

    getScores: async () => {
      const token = localStorage.getItem(tokenKey);
      const response = await fetch(`http://${host}/api/scores`, { 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token ?? ''}`
        },
        method: "GET"
      })
      console.log('test')

      if (response.ok  == false) 
          return []
        
      const data = await response.json();

      if (data != null) {
        console.log(data);
        return data;
      }

      return []
    }
}