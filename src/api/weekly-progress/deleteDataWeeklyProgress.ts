import { APIAxiosInstance } from "@/src/api";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

// Function to delete a project
const handleDeleteWeeklyProgress = async (idToDelete: string): Promise<AxiosResponse<any>> => {
  return APIAxiosInstance.delete(`weeklyprogress/delete/${idToDelete}`);
};

// Mutation function for deleting a project
export const useDeleteDataWeeklyProgress = (refetchProjectData: () => void) => {
  return useMutation({
    mutationFn: (idToDelete: string) => handleDeleteWeeklyProgress(idToDelete), // Define mutation function explicitly
    onSuccess: (data) => {
      if (data.status === 200) {
        refetchProjectData();
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
