import React from "react";
import "./styles/index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Inscription from "./pages/Inscription";
import ChatBox from "./pages/ChatBox";
import LoginProvider from "./tools/LoginContext";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <LoginProvider>
          <Routes>
            <Route path="/log" element={<Login />}></Route>
            <Route path="/insc" element={<Inscription />}></Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="/chat" element={<ChatBox />}></Route>
            <Route path="*" element={<ChatBox />}></Route>
          </Routes>
        </LoginProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
