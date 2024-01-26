import React, { useState } from "react";

export const UserContext = React.createContext();

const AuthContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({
    userPermission: [
      {
        id: 1,
        name: "Bills",
        link: "/bills",
      },
      // {
      //   id: 2,
      //   name: "Todos",
      //   link: "/todos",
      // },
      {
        id: 3,
        name: "Dependent Selector",
        link: "/dependentSelector",
      },
      {
        id: 4,
        name: "XLSX",
        link: "/xlsx",
      },
    ],
    designation: "Software Engineer",
  });
  const authInfo = {
    auth,
    loading,
  };

  return (
    <UserContext.Provider value={authInfo}>{children}</UserContext.Provider>
  );
};

export default AuthContext;
