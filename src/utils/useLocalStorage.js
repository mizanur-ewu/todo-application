const useLocalStorage = () => {//custom hook
  const setAuthToken = (data) => {
    localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN, data);
  };
  const getAuthToken = () => {
    const authToken = true;
    return authToken;
  };
  return {
    setAuthToken,
    getAuthToken,
  };
};
export default useLocalStorage;
