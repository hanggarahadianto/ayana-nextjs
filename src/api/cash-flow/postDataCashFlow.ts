import { useMutation } from "@tanstack/react-query"; // Correct import from '@tanstack/react-query'
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";

const handleSubmitCashFlowForm = async (values: ICashFlowCreate) => {
  console.log("values on fetching", values);
  const response = await APIAxiosInstance.post(`/cashflow/post`, values);
  return response.data; // Return the response data
};

// Custom hook for the mutation
export const useSubmitCashFlowForm = () => {
  return useMutation({
    mutationFn: async (values: any) => await handleSubmitCashFlowForm(values),

    onError: (error: any) => {
      console.error("Gagal menyimpan data:", error);
      showNotification({
        title: "Data Gagal Disimpan",
        message: error.message || "Terjadi kesalahan",
        color: "red",
      });
    },
  });
};
