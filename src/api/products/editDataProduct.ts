import { useMutation } from "@tanstack/react-query"; // Correct import from '@tanstack/react-query'
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "@/src/api";

const handleEditProductForm = async (values: IProjectCreate) => {
  console.log("values on fetching", values);
  const response = await APIAxiosInstance.post(`home/edit`, values);
  return response.data; // Return the response data
};

// Custom hook for the mutation
export const useEditProductForm = (refetchProductData: () => void, closeModal: () => void) => {
  return useMutation({
    mutationFn: (values: any) => handleEditProductForm(values),
    onSuccess: (data: any) => {
      console.log("pesan sukses terkirim");
      refetchProductData();
      closeModal();
      showNotification({
        title: "Data Berhasil Dikirim",
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
