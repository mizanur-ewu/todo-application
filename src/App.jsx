import "./App.css";
import { Route, Routes } from "react-router-dom";
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
import useAuth from "./hooks/useAuth";
// import useAuth from "./utils/useAuth";

function App() {
  // console.log(location?.pathname);
  const { auth, loading } = useAuth();
  console.log(auth);
  // if(loading){
  //   return <p>loading</p>
  // }

  return (
    <>
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
    </>
  );
}

export default App;
