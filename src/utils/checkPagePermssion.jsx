import useAuth from "../hooks/useAuth";
import { links } from "../Pages/Navbar/Navbar";

export const checkPagePermission = () => {
  const { auth } = useAuth();

  console.log(links);
  console.log(auth?.userPermission);

  const flag = links?.map((link) => {
    // console.log(link?.link)
    auth?.userPermission?.map((page)=>{
        console.log(page?.name)
    })
  });
};
export default checkPagePermission;
