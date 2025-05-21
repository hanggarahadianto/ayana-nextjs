import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";
import { AxiosError } from "axios";

interface APIErrorResponse {
  message?: string;
  error?: string;
  status?: string;
  // Add other possible error response fields
}

const handleSubmitTransactionCategoryForm = async (values: ITransactionCategoryCreate) => {
  console.log("Submitting TransactionCategory form with values:", values);
  const response = await APIAxiosInstance.post("transaction-category/post", values);
  return response.data;
};

export const useSubmitTransactionCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<APIErrorResponse>, ITransactionCategoryCreate>({
    mutationFn: handleSubmitTransactionCategoryForm,
    onSuccess: async (data) => {
      try {
        console.log("TransactionCategory data successfully submitted");

        // Jalankan refetch dan tampilkan notifikasi

        await Promise.all([
          queryClient.refetchQueries({
            queryKey: ["getTransactionCategory"],
            exact: false,
          }),
        ]);

        showNotification({
          title: "Data Berhasil Dikirim",
          message: "Data akun berhasil disimpan",
          color: "green",
        });
      } catch (e) {
        console.error("Error in onSuccess handler:", e);
        showNotification({
          title: "Peringatan",
          message: "Data berhasil disimpan tetapi ada masalah tampilan",
          color: "yellow",
        });
      }
    },
    onError: (error) => {
      console.error("TransactionCategory submission error:", error);

      const errorMessage =
        error.response?.data?.message || error.response?.data?.error || error.message || "Terjadi kesalahan saat menyimpan data akun";

      showNotification({
        title: "Data Gagal Disimpan",
        message: errorMessage,
        color: "red",
      });
    },
  });
};
