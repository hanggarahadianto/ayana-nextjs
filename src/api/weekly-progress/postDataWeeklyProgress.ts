import { useMutation } from "@tanstack/react-query"; // Correct import from '@tanstack/react-query'
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "..";

const handleSubmitWeeklyProgressForm = async (values: IWeeklyProgressCreate) => {
  console.log("values on fetching", values);
  const response = await APIAxiosInstance.post(`/weeklyprogress/post`, values);
  return response.data; // Return the response data
};

// Custom hook for the mutation
export const useSubmitWeeklyProgressForm = (refetchProjectData: () => void, closeModal: () => void) => {
  return useMutation({
    mutationFn: (values: any) => handleSubmitWeeklyProgressForm(values),
    onSuccess: (data: any) => {
      console.log("pesan sukses terkirim");
      refetchProjectData();
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
