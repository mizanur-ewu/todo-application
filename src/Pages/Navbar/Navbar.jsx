import { Link } from "react-router-dom";
import useLocalStorage from "../../utils/useLocalStorage";

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
];
const Navbar = () => {
  const localStorage = useLocalStorage();
  const { getAuthToken } = localStorage;
const userPagePermissions = getAuthToken()?.userPagePermission;
  return (
    <div>
      <ul className="flex m-2">
        {userPagePermissions?.map(
          (permission) =>
            navbarLinks?.some((link) => link?.name === permission?.name) && (
              <li key={permission?.id}>
                <Link
                  className="m-2 px-1 rounded-md text-xl bg-blue-600"
                  to={permission?.link}
                >
                  {permission?.name}
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Navbar;
