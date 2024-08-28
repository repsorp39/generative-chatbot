import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import axios from "axios";
import { LoginContext } from "../tools/LoginContext";

const Inscription = () => {
  const navigate = useNavigate();
  const { isLogin } = useContext(LoginContext);

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

  function handleInsc(event) {
    event.preventDefault();
    if (email.trim() === "" || !regexEmail.test(email)) {
      setEmailErr("Please put a valid email");
      return;
    } else {
      setEmailErr("");
    }

    if (password.trim() === "" || password.length < 7) {
      setPassErr("Invalid password. 8 characters min");
      return;
    } else {
      setPassErr("");
    }

    const url = "https://chatbot-google-api.onrender.com/connexion/insc";
    const data = {
      email,
      password,
    };
    axios
      .post(url, data)
      .then((res) => {
        const url = "https://chatbot-google-api.onrender.com/connexion/login";
        axios
          .post(url, data)
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            window.location.reload();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        if (err.response.status === 400);
        setEmailErr("This email already exist!");
      });
  }
  return (
    <>
      <Banner />
      <p className="intro">
        Brillance is an intellisense web app that can help you daily in your
        reflexive tasks.
        <span>
          So join us now !<i className="bi bi-emoji-sunglasses"></i>
        </span>
      </p>
      <form className="login-form" onSubmit={handleInsc}>
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
        <button type="submit">Sign Up</button>
        <span className="no-account">
          Have already an account? <Link to="/log">Sign in!</Link>
        </span>
      </form>
    </>
  );
};

export default Inscription;
