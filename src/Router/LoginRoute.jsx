import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Pages/Login/Login';

const LoginRoute = () => {
    return (
       <Routes>
        <Route path='/' element={<Login/>}/>
       </Routes>
    );
};

export default LoginRoute;