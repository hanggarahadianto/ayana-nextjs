import { useMutation } from "@tanstack/react-query"; // Correct import from '@tanstack/react-query'
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";

const handleSubmitGoodForm = async (values: IPayoutCreate) => {
  console.log("values on fetching", values);
  const response = await APIAxiosInstance.post("good/post", values);
  return response.data; // Return the response data
};

// Custom hook for the mutation
export const useSubmitGoodForm = () => {
  return useMutation({
    mutationFn: (values: any) => handleSubmitGoodForm(values),

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
