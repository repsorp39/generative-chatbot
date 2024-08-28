import React from "react";
import SingleMessage from "./SingleMessage";

const MessageContainer = ({ chatHistori }) => {
  return (
    <>
      <section className="message-container">
        {chatHistori.map((chat) => (
          <SingleMessage key={chat._id} message={chat} />
        ))}
      </section>
    </>
  );
};

export default MessageContainer;
