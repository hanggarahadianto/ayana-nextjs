import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { APIAxiosInstance } from "../../lib";

const handleDeleteEmployee = async (idToDelete: string): Promise<AxiosResponse<any>> => {
  return APIAxiosInstance.delete(`employee/delete/${idToDelete}`);
};

export const useDeleteDataEmployee = (refetchDataEmployee: () => void) => {
  return useMutation({
    mutationFn: (idToDelete: string) => handleDeleteEmployee(idToDelete), // Define mutation function explicitly
    onSuccess: (data) => {
      if (data.status === 200) {
        refetchDataEmployee();
        showNotification({
          title: "Data Berhasil Dihapus",
          message: undefined,
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
    onError: (error: any) => {
      showNotification({
        title: "Data Gagal Dihapus",
        message: error.response?.data?.message || "Terjadi kesalahan",
        color: "red",
      });
    },
  });
};
