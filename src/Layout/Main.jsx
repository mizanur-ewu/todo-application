import React, { useState } from "react";
import Navbar from "../Pages/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import useLocalStorage from "../utils/useLocalStorage";
export const navbarLinks = [
  {
    id: 1,
    name: "Bills",
    link: "/bills",
  },
  {
    id: 2,
    name: "Todos",
    link: "/todos",
  },
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
  {
    id: 5,
    name: "Settings",
    link: "/settings",
  },
  {
    id: 6,
    name: "Login",
    link: "/login",
  },
];
const Main = () => {
  const localStorage = useLocalStorage();
  const { getAuthToken } = localStorage;
  const userPagePermissions = getAuthToken()?.userPagePermission;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <div
        className={`h-screen bg-slate-200 flex  duration-300 ease-in-linear   ${
          isSidebarOpen ? "ml-0" : "-ml-[100px]"
        }`}
      >
        <aside className="w-[200px] bg-[#1c2434] text-white  overflow-y-auto border ">
          <button
            className="absolute top-2 right-2 p-2 bg-gray-300 rounded-full"
            onClick={toggleSidebar}
          >
            Toggle Sidebar
          </button>
          <div>--SIDE BAR--</div>
          <div>
            {userPagePermissions?.map(
              (permission) =>
                navbarLinks?.some(
                  (link) => link?.name === permission?.name
                ) && (
                  <ul key={permission.name}>
                    <li className=" border" key={permission?.id}>
                      <Link
                        className="m-2 px-1 rounded-md text-sm"
                        to={permission?.link}
                      >
                        {permission?.name}
                      </Link>
                    </li>
                  </ul>
                )
            )}
          </div>
        </aside>
        <div className="flex-grow border">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
