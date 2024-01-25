import useLocalStorage from "./useLocalStorage";
import { Navigate, useParams } from "react-router-dom";

const RequireAuth = ({ pageName, children }) => {
  const localStorage = useLocalStorage();
  const {pName}  = useParams();
  console.log(pName);
  const { getAuthToken } = localStorage;

  const hasPermission = getAuthToken()?.userPermission?.some(
    (permission) => permission?.name === pageName
  );
  console.log(getAuthToken())

  if (!hasPermission) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
};

export default RequireAuth;
