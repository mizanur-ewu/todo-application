import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Bills from "../Pages/Todos/Bills/Bills";
import Todos from "../Pages/Todos/Todos";
import DependentSelector from "../Pages/DependentSelector/DependentSelector";
import Xlsx from "../Pages/Xlsx/Xlsx";
import Login from "../Pages/Login/Login";
import PrivateRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/todos",
        element: <Todos />,
      },
      {
        path: "/bills",
        element: <Bills />,
      },
      {
        path: "/dependentSelector",
        element: <DependentSelector />,
      },
      {
        path: "/xlsx",
        element: (
          <PrivateRoute>
            <Xlsx />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
