import React, { useState } from "react";
import Navbar from "../Pages/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsFiletypeXlsx } from "react-icons/bs";
import { FaHome } from "react-icons/fa";

import useLocalStorage from "../utils/useLocalStorage";
export const navbarLinks = [
  {
    id: 1,
    name: "Bills",
    link: "/bills",
    icon: <FaHome size="20px" />,
  },
  {
    id: 2,
    name: "Todos",
    link: "/todos",
    icon: <FaHome size="20px" />,
  },
  {
    id: 3,
    name: "Dependent Selector",
    link: "/dependentSelector",
    icon: <FaHome size="20px" />,
  },
  {
    id: 4,
    name: "XLSX",
    link: "/xlsx",
    icon: <FaHome size="20px" />,
  },
  {
    id: 5,
    name: "Settings",
    link: "/settings",
    icon: <FaHome size="20px" />,
  },
  {
    id: 6,
    name: "Login",
    link: "/login",
    icon: <FaHome size="20px" />,
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
        <aside className="w-[250px] bg-[#1c2434] text-white  overflow-y-auto border ">
          <button
            className="absolute top-2 right-2 p-2 bg-gray-300 rounded-full"
            onClick={toggleSidebar}
          >
            Toggle Sidebar
          </button>
          <div className="flex justify-center">--SIDE BAR--</div>
          <p className="text-gray-500 font-semibold ml-2">MENU</p>
          <div>
            {navbarLinks?.map(
              (navLink) =>
                userPagePermissions?.some(
                  (permission) => permission?.name === navLink?.name
                ) && (
                  <ul key={navLink.name}>
                    <li className="" key={navLink?.id}>
                      <Link
                        className="m-2 px-4 py-2 bg-slate-700  flex items-center text-md"
                        to={navLink?.link}
                      >
                        <p className="mr-2"> {navLink?.icon}</p>
                        <p className="text-gray-300 font-semibold">
                          {navLink?.name}
                        </p>
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
