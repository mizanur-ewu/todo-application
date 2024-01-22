import React, { useContext } from "react";
import useLocalStorage from "./useLocalStorage";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";

const RequireAuth = ({ pageName, children }) => {
  // const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  // setIsLoggedIn(true)
  const localStorage = useLocalStorage();
  const { getAuthToken } = localStorage;
  // console.log(isLoggedIn);
  if (!getAuthToken()) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      {children}
    </div>
  );
};

export default RequireAuth;
