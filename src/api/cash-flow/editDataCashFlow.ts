import { useMutation } from "@tanstack/react-query"; // Correct import from '@tanstack/react-query'
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "@/src/api";

const handleEditCashFlowForm = async (values: ICashFlowUpdate) => {
  console.log("values on fetching", values);
  const response = await APIAxiosInstance.put(`/cashflow/edit`, values);
  return response.data; // Return the response data
};

// Custom hook for the mutation
export const useUpdateCashFlowForm = (refetchProjectData: () => void, closeModal: () => void) => {
  return useMutation({
    mutationFn: (values: any) => handleEditCashFlowForm(values),
    onSuccess: (data: any) => {
      console.log("pesan sukses terkirim");
      refetchProjectData();
      closeModal();
      showNotification({
        title: "Data Berhasil Diubah",
        message: "",
        color: "green",
      });
    },
    onError: (data: any) => {
      showNotification({
        title: "Data Gagal Disimpan",
        message: `${data.message}`,
        color: "red",
      });
    },
    onSettled: () => {},
  });
};
