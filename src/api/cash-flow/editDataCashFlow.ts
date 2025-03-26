import { useMutation } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "..";

// Handle PUT request to update cash flow (tanpa ID di payload)
const handleEditCashFlowForm = async (id: string, values: ICashFlowUpdate) => {
  try {
    console.log("Sending updated cash flow data:", values);
    const response = await APIAxiosInstance.put(`/cashflow/edit/${id}`, values);
    return response.data;
  } catch (error: any) {
    console.error("Error updating cash flow:", error);
    throw error.response?.data?.error || "Terjadi kesalahan saat memperbarui data";
  }
};

// Custom hook untuk update cash flow
export const useUpdateCashFlowForm = () => {
  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: ICashFlowUpdate }) => handleEditCashFlowForm(id, values),

    onError: (error: any) => {
      showNotification({
        title: "Data Gagal Disimpan",
        message: error as string,
        color: "red",
      });
    },
  });
};
