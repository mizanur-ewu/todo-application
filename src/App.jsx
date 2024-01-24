import "./App.css";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Main from "./Layout/Main";
import Bills from "./Pages/Todos/Bills/Bills";
import Home from "./Pages/Home/Home";
import DependentSelector from "./Pages/DependentSelector/DependentSelector";
import Todos from "./Pages/Todos/Todos";
import PrivateRoute from "./Router/ProtectedRoute";
import Xlsx from "./Pages/Xlsx/Xlsx";
import Login from "./Pages/Login/Login";
import RequireAuth from "./utils/RequireAuth";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  const { params } = useParams();
  console.log(params);

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

            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route
            path="/xlsx"
            element={
              <PrivateRoute>
                <Xlsx />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
