// utils/useCookies.ts
import Cookies from "js-cookie";

export const useCookies = () => {
  const getToken = () => Cookies.get("token");

  return {
    getToken,
  };
};
