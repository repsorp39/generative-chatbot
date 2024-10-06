import React, { useContext, useEffect, useRef, useState } from "react";
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
  const chatRef = useRef(null);
  useEffect(() => {
    if (!isLogin) navigate("/log");
  });

  const fetchMessage = async () =>{
    const url = "https://chatbot-google-api.onrender.com/chatbot/historique";
    axios
    .get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => setHistori(res.data.historique))
    .catch((err) => console.log(err));
    chatRef.current.scrollTop = chatRef.current.scrollHeight
  }

   useEffect(()=>{
    (async ()=>{
      await fetchMessage()
    })()
   },[])

  return (
    <>
      <article className="chat-box" ref={chatRef}>
        <ChatBanner />
        <MessageContainer chatHistori={chatHistori} />
        <SendBarre fetchMessage={fetchMessage} />
      </article>
    </>
  );
};

export default ChatBox;
