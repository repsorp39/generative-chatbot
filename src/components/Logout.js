import React, { useContext } from "react";
import { LoginContext } from "../tools/LoginContext";

const Logout = () => {
  const {setLogin} = useContext(LoginContext);
  return (
    <>
      <i
        className="bi bi-door-open-fill logout"
        title="Log Out"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
          setLogin(false);
        }}
      ></i>
    </>
  );
};

export default Logout;
