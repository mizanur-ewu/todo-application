import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    //write a function to find maximum number of consecutive 1's in a binary array.
    
    return (
        <div>
            <ul className='flex m-2'>
                <li><Link className='m-2 px-1 rounded-md text-xl bg-blue-600' to="/bills">Bills</Link></li>
                <li><Link className='m-2 px-1 rounded-md text-xl bg-blue-600' to="/todos">Todos</Link></li>
                <li><Link className='m-2 px-1 rounded-md text-xl bg-blue-600' to="/dependentSelector">Dependent Selector</Link></li>
                <li><Link className='m-2 px-1 rounded-md text-xl bg-blue-600' to="/xlsx">XLSX</Link></li>
                <li><Link className='m-2 px-1 rounded-md text-xl bg-blue-600' to="/xlsx">XLSX</Link></li>
            </ul>
        </div>
    );
};

export default Navbar;