import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../src/Router/Pages/Navbar/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default Main;