import { useMutation } from "@tanstack/react-query"; // Correct import from '@tanstack/react-query'
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";

const handleEditPayoutForm = async (values: IProjectUpdate) => {
  console.log("values on fetching", values);
  const response = await APIAxiosInstance.put(`/payout/edit`, values);
  return response.data; // Return the response data
};

// Custom hook for the mutation
export const useUpdatePayoutForm = (refetchPayoutData: () => void, closeModal: () => void) => {
  return useMutation({
    mutationFn: (values: any) => handleEditPayoutForm(values),
    onSuccess: (data: any) => {
      console.log("pesan sukses terkirim");
      refetchPayoutData();
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
