import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";

const handleEditAccountForm = async (id: string, values: IAccountUpdate) => {
  try {
    const response = await APIAxiosInstance.put(`/account/edit/${id}`, values);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error || "Terjadi kesalahan saat memperbarui data";
  }
};

// Custom hook untuk update cash flow
export const useUpdateAccountForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: IAccountUpdate }) => handleEditAccountForm(id, values),
    onSuccess: async (data: any) => {
      if (data) {
        await Promise.all([
          queryClient.refetchQueries({
            queryKey: ["getAccountData"],
            exact: false,
          }),
        ]);
      }
    },
    onError: (error: any) => {
      showNotification({
        title: "Data Gagal Disimpan",
        message: error as string,
        color: "red",
      });
    },
  });
};
