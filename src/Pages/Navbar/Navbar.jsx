import React from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../../utils/useLocalStorage";

const Navbar = () => {
  const localStorage = useLocalStorage();
  const { getAuthToken } = localStorage;
  console.log(getAuthToken()?.userPermission);
  return (
    <div>
      <ul className="flex m-2">
        {getAuthToken()?.userPermission?.map((permission) => (
          <li key={permission?.id}>
            <Link
              className="m-2 px-1 rounded-md text-xl bg-blue-600"
              to={permission?.link}
            >
              {permission?.name}
            </Link>
          </li>
        ))}
        {/* <li>
          <Link className="m-2 px-1 rounded-md text-xl bg-blue-600" to="/bills">
            Bills
          </Link>
        </li>
        <li>
          <Link className="m-2 px-1 rounded-md text-xl bg-blue-600" to="/todos">
            Todos
          </Link>
        </li>
        <li>
          <Link
            className="m-2 px-1 rounded-md text-xl bg-blue-600"
            to="/dependentSelector"
          >
            Dependent Selector
          </Link>
        </li>
        <li>
          <Link className="m-2 px-1 rounded-md text-xl bg-blue-600" to="/xlsx">
            XLSX
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Navbar;
