import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { APIAxiosInstance } from "@/lib";

const handleDeleteTestimony = async (idToDelete: string): Promise<AxiosResponse<any>> => {
  return APIAxiosInstance.delete(`customer/testimony/delete/${idToDelete}`);
};

export const useDeleteTestimony = (refetchData: () => void) => {
  return useMutation({
    mutationFn: (idToDelete: string) => handleDeleteTestimony(idToDelete),
    onSuccess: (response) => {
      if (response.status === 200) {
        refetchData();
        showNotification({
          title: "Testimony Berhasil Dihapus",
          message: undefined,
          color: "green",
        });
      } else {
        showNotification({
          title: "Error",
          message: response.data?.message || "Terjadi kesalahan",
          color: "red",
        });
      }
    },
    onError: (error: any) => {
      showNotification({
        title: "Gagal Menghapus Testimony",
        message: error.response?.data?.message || "Terjadi kesalahan",
        color: "red",
      });
    },
  });
};
