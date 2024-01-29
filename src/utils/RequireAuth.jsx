import useLocalStorage from "./useLocalStorage";
import { Navigate, useParams } from "react-router-dom";

const RequireAuth = ({ pageName, children }) => {
  const localStorage = useLocalStorage();
  const {pName}  = useParams();
  const { getAuthToken } = localStorage;

  const hasPermission = getAuthToken()?.userPagePermission?.some(
    (permission) => permission?.name === pageName
  );

  if (!hasPermission) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
};

export default RequireAuth;
