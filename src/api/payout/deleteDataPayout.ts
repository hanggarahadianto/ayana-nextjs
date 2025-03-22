import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { APIAxiosInstance } from "..";

// Function to delete a project
const deletePayoutAPI = async (idToDelete: string): Promise<AxiosResponse<any>> => {
  return APIAxiosInstance.delete(`payout/delete/${idToDelete}`);
};

export const useDeleteDataPayout = (refetchPayoutData: () => void) => {
  return useMutation({
    mutationFn: (id: string) => deletePayoutAPI(id), // Pastikan deletePayoutAPI menerima ID sebagai parameter
    onSuccess: (data) => {
      if (data?.status === 200) {
        refetchPayoutData();
        showNotification({
          title: "Data Berhasil Dihapus",
          message: "Data payout telah dihapus dengan sukses",
          color: "green",
        });
      } else {
        showNotification({
          title: "Error",
          message: data.data?.message || "Terjadi kesalahan",
          color: "red",
        });
      }
    },
    onError: (error) => {
      console.error("Gagal menghapus payout:", error);
    },
  });
};
