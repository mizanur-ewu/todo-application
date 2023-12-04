import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <ul>
                <li><Link to="/bills">Bills</Link></li>
                {/* <li><Link to="/bills">Person</Link></li> */}
            </ul>
        </div>
    );
};

export default Navbar;