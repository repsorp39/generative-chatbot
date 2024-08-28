import React from "react";

const Logout = () => {
  return (
    <>
      <i
        className="bi bi-door-open-fill logout"
        title="Log Out"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      ></i>
    </>
  );
};

export default Logout;
