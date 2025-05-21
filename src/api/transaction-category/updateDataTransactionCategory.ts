import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";

const handleEditTransactionCategoryForm = async (id: string, values: ITransactionCategoryUpdate) => {
  try {
    const response = await APIAxiosInstance.put(`/transaction-category/edit/${id}`, values);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error;
  }
};

// Custom hook untuk update cash flow
export const useUpdateTransactionCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: ITransactionCategoryUpdate }) => handleEditTransactionCategoryForm(id, values),
    onSuccess: async (data: ITransactionCategoryUpdate) => {
      if (data) {
        await Promise.all([
          queryClient.refetchQueries({
            queryKey: ["getTransactionCategory"],
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
