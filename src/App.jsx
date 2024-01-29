import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
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
import checkPagePermission from "./utils/checkPagePermssion";
import Unauthorized from "./Pages/Unauthorized/Unauthorized";
import { useContext } from "react";
import { UserContext } from "./contextApi/AuthContext";
import MainRoute from "./Router/MainRoute";
import LoginRoute from "./Router/LoginRoute";

function App() {
  const location = useLocation();
  const pathName = location?.pathname;
  const { auth, isLoggedIn } = useContext(UserContext);
  console.log(isLoggedIn);
  let flag = checkPagePermission(pathName, auth);
  console.log(pathName);
  console.log(flag);
  if (flag === "unauthorized" && pathName!=="/") {
    console.log("first");
    return (
      <Routes>
        <Route path={pathName} element={<Unauthorized />} />
      </Routes>
    );
  }
  if (flag === "notFound" && pathName!=="/") {
    return (
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
  return <>{isLoggedIn ? <MainRoute /> : <LoginRoute />}</>;
}

export default App;
{
  /* <Routes>
<Route path="/" element={<Main />}>
  <Route index element={<Home />} />
  <Route
    path="/bills"
    element={
      // <RequireAuth pageName={"Bills"}>
      <Bills />
      // </RequireAuth>
    }
  />
  <Route
    path="/todos"
    element={
      // <RequireAuth pageName={"Todos"}>
      <Todos />
      // </RequireAuth>
    }
  />
  <Route
    path="/dependentSelector"
    element={
      // <RequireAuth pageName={"Dependent Selector"}>
      <DependentSelector />
      // </RequireAuth>
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
</Routes> */
}
