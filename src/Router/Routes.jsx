import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Bills from "../Pages/Bills";

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
            path:"/bills",
            element:<Bills/>
        }
      ]
    },
  ]);