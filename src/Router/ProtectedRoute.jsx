import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const auth= true
    return (auth? children: <Navigate to="/login"/>)

}
