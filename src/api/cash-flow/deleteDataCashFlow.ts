import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { APIAxiosInstance } from "../../lib";

// Function to delete a project
const deleteCashFlowAPI = async (idToDelete: string): Promise<AxiosResponse<any>> => {
  return APIAxiosInstance.delete(`cashflow/deleteById/${idToDelete}`);
};

export const useDeleteDataCashFlow = (refetchCashFlowData: () => void, refetchGoodData: () => void, close: any) => {
  return useMutation({
    mutationFn: (id: string) => deleteCashFlowAPI(id), // Pastikan deletePayoutAPI menerima ID sebagai parameter
    onSuccess: (data) => {
      if (data?.status === 200) {
        refetchCashFlowData();
        refetchGoodData();
        close();
        showNotification({
          title: "Data Berhasil Dihapus",
          message: "Data cashflow telah dihapus dengan sukses",
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
      console.error("Gagal menghapus cashflow:", error);
    },
  });
};
