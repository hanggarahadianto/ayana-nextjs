import { useMutation } from "@tanstack/react-query"; // Correct import from '@tanstack/react-query'
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "@/src/api";

const handleSubmitReservationForm = async (values: any) => {
  console.log("values on fetching", values);
  const response = await APIAxiosInstance.post(`reservation/post`, values);
  return response.data; // Return the response data
};

// Custom hook for the mutation
export const useSubmitReservationForm = () => {
  return useMutation({
    mutationFn: (values: any) => handleSubmitReservationForm(values),
    onSuccess: (data: any) => {
      console.log("pesan sukses terkirim");
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
