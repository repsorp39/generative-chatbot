import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLogin, setLogin] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      axios
        .post("https://chatbot-google-api.onrender.com/auth", { token: savedToken })
        .then((res) => {
          if (res.data.success) {
            setLogin(true);
          } else {
            setLogin(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setLogin(false);
    }
  }, []);
  return (
    <LoginContext.Provider value={{ isLogin, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
export default LoginProvider;
