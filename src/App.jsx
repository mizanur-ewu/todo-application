import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Layout/Main";
import Bills from "./Pages/Todos/Bills/Bills";
import Home from "./Pages/Home/Home";
import DependentSelector from "./Pages/DependentSelector/DependentSelector";
import Todos from "./Pages/Todos/Todos";
import PrivateRoute from "./Router/ProtectedRoute";
import Xlsx from "./Pages/Xlsx/Xlsx";
import Login from "./Pages/Login/Login";
import RequireAuth from "./utils/RequireAuth";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Home />} />
            <Route
              path="/bills"
              element={
                <RequireAuth pageName={"Bills"}>
                  <Bills />
                </RequireAuth>
              }
            />
            <Route
              path="/todos"
              element={
                <RequireAuth pageName={"Todos"}>
                  <Todos />
                </RequireAuth>
              }
            />
            <Route
              path="/dependentSelector"
              element={
                <RequireAuth pageName={"Dependent Selector"}>
                  <DependentSelector />
                </RequireAuth>
              }
            />

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
