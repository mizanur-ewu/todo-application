import { Link } from "react-router-dom";
import useLocalStorage from "../../utils/useLocalStorage";

export const links = [
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
];
const Navbar = () => {
  const localStorage = useLocalStorage();
  const { getAuthToken } = localStorage;
const userPermissions = getAuthToken()?.userPermission;
  return (
    <div>
      <ul className="flex m-2">
        {userPermissions?.map(
          (permission) =>
            links?.some((link) => link?.name === permission?.name) && (
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
