import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { APIAxiosInstance } from "../../lib";

// Function to delete a project
const handleDeleteTransactionCategory = async (idToDelete: string): Promise<AxiosResponse<any>> => {
  return APIAxiosInstance.delete(`transaction-category/delete/${idToDelete}`);
};

// Mutation function for deleting a project
export const useDeleteDataTransactionCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (idToDelete: string) => handleDeleteTransactionCategory(idToDelete), // Define mutation function explicitly
    onSuccess: async (data) => {
      if (data.status === 200) {
        await Promise.all([
          queryClient.refetchQueries({
            queryKey: ["getTransactionCategory"],
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
