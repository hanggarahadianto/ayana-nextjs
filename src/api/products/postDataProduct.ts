import { useMutation } from "@tanstack/react-query"; // Correct import from '@tanstack/react-query'
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";

const handleSubmitProductForm = async (values: IProductCreate) => {
  console.log("values on fetching", values);
  const response = await APIAxiosInstance.post(`home/post`, values);
  return response.data;
};

// Custom hook for the mutation
export const useSubmitProductForm = (closeModal: () => void) => {
  return useMutation({
    mutationFn: (values: IProductCreate) => handleSubmitProductForm(values),
    onSuccess: (data: any) => {
      console.log("pesan sukses terkirim");

      closeModal();
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
