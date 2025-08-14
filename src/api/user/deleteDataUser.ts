import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { APIAxiosInstance } from "../../lib";

const handleDeleteUser = async (idToDelete: string): Promise<AxiosResponse<any>> => {
  return APIAxiosInstance.delete(`user/delete/${idToDelete}`);
};

// Mutation function for deleting a project
export const useDeleteDataUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (idToDelete: string) => handleDeleteUser(idToDelete), // Define mutation function explicitly
    onSuccess: async (data) => {
      if (data.status === 200) {
        await Promise.all([
          queryClient.refetchQueries({
            queryKey: ["getUserByIdData"],
            exact: false,
          }),
        ]);
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
