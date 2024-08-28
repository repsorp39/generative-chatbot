import React from "react";

const SingleMessage = ({ message }) => {
  return (
    <>
      <div className="prompt">{message.prompt}</div>
      <div className="response">{message.response}</div>
    </>
  );
};

export default SingleMessage;
