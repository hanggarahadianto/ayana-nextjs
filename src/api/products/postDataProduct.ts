import { useMutation } from "@tanstack/react-query"; // Correct import from '@tanstack/react-query'
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";

const handleSubmitProductForm = async (values: IProjectCreate) => {
  console.log("values on fetching", values);
  const response = await APIAxiosInstance.post(`home/post`, values);
  return response.data; // Return the response data
};

// Custom hook for the mutation
export const useSubmitProductForm = (refetchProductData: () => void, closeModal: () => void) => {
  return useMutation({
    mutationFn: (values: any) => handleSubmitProductForm(values),
    onSuccess: (data: any) => {
      console.log("pesan sukses terkirim");
      refetchProductData();
      closeModal();
      // showNotification({
      //   title: "Data Berhasil Dikirim",
      //   message: "",
      //   color: "green",
      // });
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
