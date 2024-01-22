import React, { createContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { router } from "./Router/Routes";
import Main from "./Layout/Main";
import Bills from "./Pages/Todos/Bills/Bills";
import Home from "./Pages/Home/Home";
import DependentSelector from "./Pages/DependentSelector/DependentSelector";
import Todos from "./Pages/Todos/Todos";
import PrivateRoute from "./Router/ProtectedRoute";
import Xlsx from "./Pages/Xlsx/Xlsx";
import Login from "./Pages/Login/Login";
import RequireAuth from "./utils/RequireAuth";

export const AuthContext = React.createContext();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Home />} />
              <Route
                path="/bills"
                element={
                  <RequireAuth pageName={"bills"}>
                    <Bills />
                  </RequireAuth>
                }
              >
                {/* <Route path="/bills" element={<Bills />} /> */}
              </Route>
              <Route
                path="/dependentSelector"
                element={<DependentSelector />}
              />
              <Route path="/todos" element={<Todos />} />
              <Route
                path="/xlsx"
                element={
                  <PrivateRoute>
                    <Xlsx />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        {/* {" "}
      <RouterProvider router={router} />
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      </AuthContext.Provider>
    </>
  );
}

export default App;
