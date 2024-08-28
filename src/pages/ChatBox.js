import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../tools/LoginContext";
import { useNavigate } from "react-router-dom";
import ChatBanner from "../components/chat/ChatBanner";
import SendBarre from "../components/chat/SendBarre";
import MessageContainer from "../components/chat/Message-Container";
import axios from "axios";

const ChatBox = () => {
  const { isLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  const [chatHistori, setHistori] = useState([]);

  useEffect(() => {
    if (!isLogin) navigate("/log");
  });

  useEffect(() => {
    const url = "https://chatbot-google-api.onrender.com/chatbot/historique";

    setInterval(() => {
      axios
        .get(url, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => setHistori(res.data.historique))
        .catch((err) => console.log(err));
    }, 300);
  }, []);

  return (
    <>
      <article className="chat-box">
        <ChatBanner />
        <MessageContainer chatHistori={chatHistori} />
        <SendBarre />
      </article>
    </>
  );
};

export default ChatBox;
