import { useState } from "react";
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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Home />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/dependentSelector" element={<DependentSelector />} />
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
    </>
  );
}

export default App;
