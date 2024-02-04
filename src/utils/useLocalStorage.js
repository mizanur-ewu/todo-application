const useLocalStorage = () => {
  //custom hook
  const setAuthToken = (data) => {
    localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN, data);
  };
  const getAuthToken = () => {
    const authToken = {
      token: "authTokennnnnnnn",
      userPagePermission: [
        {
          id: 1,
          name: "Bills",
          link: "/bills",
        },
        // {
        //   id: 2,
        //   name: "Todos",
        //   link: "/todos",
        // },
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
        {
          id: 6,
          name: "Login",
          link: "/login",
        },
      ],
    };
    return authToken;
  };
  return {
    setAuthToken,
    getAuthToken,
  };
};
export default useLocalStorage;
