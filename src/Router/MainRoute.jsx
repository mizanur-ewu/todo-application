import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Bills from "../Pages/Todos/Bills/Bills";
import Todos from "../Pages/Todos/Todos";
import DependentSelector from "../Pages/DependentSelector/DependentSelector";
import Xlsx from "../Pages/Xlsx/Xlsx";
import Settings from "../Pages/Settings/Settings";

const MainRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/dependentSelector" element={<DependentSelector />} />
          <Route path="/xlsx" element={<Xlsx />} />
          <Route path="/settings" element={<Settings/>} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRoute;
