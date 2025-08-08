"use client";

import { useMutation } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import Cookies from "js-cookie";
import { APIAxiosInstanceWithoutCredential } from "@/lib";
import { useRouter } from "next/navigation";

const handleLogin = async (values: IUserPayload) => {
  const response = await APIAxiosInstanceWithoutCredential.post(`auth/login`, values);
  return response.data;
};

export const useLoginMutation = (onSuccessRedirectUrl?: string) => {
  const router = useRouter(); // ✅ aman karena sudah dalam file client

  return useMutation({
    mutationFn: (values: IUserPayload) => handleLogin(values),
    onSuccess: (data: IAuthResponse) => {
      console.log("data user who login", data);
      Cookies.set("token", data.data.token, { expires: 1 });
      Cookies.set("user", JSON.stringify(data.data.user), { expires: 1 });

      showNotification({
        title: "Berhasil Login",
        message: "",
        color: "green",
      });

      if (onSuccessRedirectUrl) {
        router.push(onSuccessRedirectUrl);
      }
    },
    onError: (data: any) => {
      showNotification({
        title: "Login Gagal",
        message: `${data?.response?.data?.message || "Terjadi kesalahan"}`,
        color: "red",
      });
    },
  });
};
