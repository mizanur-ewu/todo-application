import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Bills from "../Pages/Todos/Bills/Bills";
import Todos from "../Pages/Todos/Todos";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
        {
            path:"/",
            element:<Home/>
        },
        {
            path:"/todos",
            element:<Todos/>
        },
        {
            path:"/bills",
            element:<Bills/>
        }
      ]
    },
  ]);