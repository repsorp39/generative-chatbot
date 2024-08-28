import React from "react";
import Logout from "../Logout";

const ChatBanner = () => {
  return (
    <>
      <div className="banner-chatbox">
        <h1>
          <i className="bi bi-lightning-charge-fill"></i> BRILLANCE CHATBOT{" "}
          <Logout />
        </h1>
      </div>
    </>
  );
};

export default ChatBanner;
