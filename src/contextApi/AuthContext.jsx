import React, { useState } from "react";
import useLocalStorage from "../utils/useLocalStorage";

export const UserContext = React.createContext();

const AuthContext = ({ children }) => {
  const localStorage = useLocalStorage();
  const { getAuthToken } = localStorage;
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(getAuthToken()?.token? false:false);
  const [auth, setAuth] = useState(getAuthToken());
  const authInfo = {
    auth,
    loading,
    isLoggedIn,
    setIsLoggedIn,
    setLoading,
    setAuth,
  };

  return (
    <UserContext.Provider value={authInfo}>{children}</UserContext.Provider>
  );
};

export default AuthContext;
