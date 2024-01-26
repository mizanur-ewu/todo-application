import useAuth from "../hooks/useAuth";
import { links } from "../Pages/Navbar/Navbar";

export const checkPagePermission = (pageLink) => {
  const { auth } = useAuth();

  console.log(links);
  console.log(auth?.userPermission);
  const permissionPage = auth?.userPermission;

  const flag = links?.map((link) => {
    console.log(pageLink);
    if (link?.link === pageLink) {
      permissionPage?.map((perPage) => {
        if (perPage?.link === pageLink) {
          console.log("first");
          return "bothMatch"
        }
      });
    }
  });
  console.log(flag)
};
export default checkPagePermission;
