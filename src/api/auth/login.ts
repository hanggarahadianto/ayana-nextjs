"use client";

import { useMutation } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import Cookies from "js-cookie";
import { APIAxiosInstance } from "@/lib";
import { useRouter } from "next/navigation";

const handleLogin = async (values: IUserPayload) => {
  // Gunakan axios instance yang sudah withCredentials: true
  const response = await APIAxiosInstance.post(`auth/login`, values);
  return response.data;
};

export const useLoginMutation = (onSuccessRedirectUrl?: string) => {
  const router = useRouter();

  return useMutation({
    mutationFn: handleLogin,
    onSuccess: (data: IAuthResponse) => {
      console.log("data user who login", data);

      // Simpan user di cookie/LocalStorage jika perlu
      Cookies.set("user", JSON.stringify(data.data.user), { expires: 1 });

      // Tampilkan notifikasi sukses
      showNotification({
        title: "Berhasil Login",
        message: "",
        color: "green",
      });

      // Redirect jika ada URL tujuan
      if (onSuccessRedirectUrl) {
        router.push(onSuccessRedirectUrl);
      }
    },
    onError: (error: any) => {
      // Tampilkan notifikasi gagal
      showNotification({
        title: "Login Gagal",
        message: `${error?.response?.data?.message || "Terjadi kesalahan"}`,
        color: "red",
      });
    },
  });
};
