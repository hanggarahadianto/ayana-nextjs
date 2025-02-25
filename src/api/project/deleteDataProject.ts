import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { APIAxiosInstance } from "..";

// Function to delete a project
const handleDeleteProject = async (idToDelete: string): Promise<AxiosResponse<any>> => {
  return APIAxiosInstance.delete(`project/delete/${idToDelete}`);
};

// Mutation function for deleting a project
export const useDeleteDataProject = (refetchProjectData: () => void) => {
  return useMutation({
    mutationFn: (idToDelete: string) => handleDeleteProject(idToDelete), // Define mutation function explicitly
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
