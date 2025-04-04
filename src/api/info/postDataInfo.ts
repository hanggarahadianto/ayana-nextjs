import { useMutation } from "@tanstack/react-query"; // Correct import from '@tanstack/react-query'
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "..";

const handleSubmitInfoPostForm = async (values: IPayoutCreate) => {
  console.log("values on fetching", values);
  const response = await APIAxiosInstance.post("info/post", values);
  return response.data; // Return the response data
};

// Custom hook for the mutation
export const useSubmitInfoForm = (refetchPayoutData: () => void, closeModal: () => void) => {
  return useMutation({
    mutationFn: (values: any) => handleSubmitInfoPostForm(values),
    onSuccess: (data: any) => {
      console.log("pesan sukses terkirim");
      refetchPayoutData();
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
