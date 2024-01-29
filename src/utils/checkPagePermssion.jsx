import { navbarLinks } from "../Pages/Navbar/Navbar";

export const checkPagePermission = (pageLink, auth) => {

  const userPagePermission = auth?.userPagePermission;

  const navbarLinkMatch = navbarLinks?.find((link) => link.link === pageLink);
  const permissionLinkMatch = userPagePermission?.find(
    (page) => page?.link === pageLink
  );
  if (navbarLinkMatch && permissionLinkMatch) {
    return "authorized";
  } else if (navbarLinkMatch && !permissionLinkMatch) {
    return "unauthorized";
  } else return "notFound";
};
export default checkPagePermission;
