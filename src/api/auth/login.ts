import { useMutation } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import Cookies from "js-cookie";
import { APIAxiosInstanceWithoutCredential } from "../../lib";

const handleLogin = async (values: IUserPayload) => {
  const response = await APIAxiosInstanceWithoutCredential.post(`auth/login`, values);
  return response.data; // Return the response data
};

// Custom hook for the mutation
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (values: IUserPayload) => handleLogin(values),
    onSuccess: (data: IAuthResponse) => {
      console.log(data);
      console.log("login terkirim");

      console.log("set kokis");
      if (data.data.token) {
        Cookies.set("token", data.data.token, { expires: 1 });
        Cookies.set("user", JSON.stringify(data.data.user), { expires: 1 });
      }

      showNotification({
        title: "Berhasil Login",
        message: "",
        color: "green",
      });
    },
    onError: (data: any) => {
      console.log("DATA", data);
      showNotification({
        title: "Login Gagal",
        message: `${data.response.data.message}`,
        color: "red",
      });
    },
    onSettled: () => {},
  });
};
