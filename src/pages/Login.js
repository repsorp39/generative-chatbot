import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import axios from "axios";
import { LoginContext } from "../tools/LoginContext";

const Login = () => {
  const { isLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) navigate("/chat", { replace: true });
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const regexEmail = new RegExp(
    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
  );
  const [errorEmail, setEmailErr] = useState("");
  const [errorPass, setPassErr] = useState("");
  const [connError, setConnErro] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    if (email.trim() === "" || !regexEmail.test(email)) {
      setEmailErr("Please put a valid email");
      return;
    } else {
      setEmailErr("");
    }

    if (password.trim() === "") {
      setPassErr("Can't be left empty!");
      return;
    } else {
      setPassErr("");
    }

    const url = "https://chatbot-google-api.onrender.com/connexion/login";
    axios
      .post(url, { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        window.location.reload();
      })
      .catch((error) => {
        if (error) setConnErro(error.response.data.message);
      });
  }
  return (
    <>
      <Banner />

      <form className="login-form" onSubmit={handleLogin}>
        {connError && <p className="error text-center"> {connError} </p>}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorEmail && <p className="error"> {errorEmail} </p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorPass && <p className="error"> {errorPass}</p>}
        </div>
        <button type="submit">Log in</button>
        <span className="no-account">
          Don't have account ? <Link to="/insc">Sign up</Link>
        </span>
      </form>
    </>
  );
};

export default Login;
