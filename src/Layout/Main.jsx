import React from "react";
import Navbar from "../Pages/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  const sideBars = [
    {
      id: 1,
      name: "My Dashboard",
    },
    {
      id: 2,
      name: "My Profile",
    },
    {
      id: 3,
      name: "Change Password",
    },
  ];
  return (
    <div>
      <Navbar />
      <div className="border h-screen bg-red-400 flex">
        <div className="w-[200px] overflow-y-auto h- border">
          <div>--SIDE BAR--</div>
          <div>{
            sideBars?.map((sideBar)=>(
              <p key={sideBar.id}>{sideBar?.name}</p>
            ))
            }</div>
        </div>
        <div className="flex-grow  border">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
