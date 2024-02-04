import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import NotFound from '../Pages/NotFound/NotFound';

const LoginRoute = () => {
    return (
       <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='*' element={<NotFound/>}/>
       </Routes>
    );
};

export default LoginRoute;