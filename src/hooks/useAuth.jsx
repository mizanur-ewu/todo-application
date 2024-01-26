import { useContext } from "react";
import  { UserContext } from "../contextApi/AuthContext";

const useAuth=()=>{
    return useContext(UserContext);
}
export default useAuth;