import { useMutation } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "..";
import { AxiosError } from "axios";

interface APIErrorResponse {
  message?: string;
  status?: string;
  // Add other possible error response fields
}

const handleSubmitPayoutForm = async (values: IPayoutCreate) => {
  try {
    console.log("Submitting payout form with values:", values);
    const response = await APIAxiosInstance.post("payout/post", values);
    return response.data;
  } catch (error) {
    console.error("Error in handleSubmitPayoutForm:", error);
    throw error; // Re-throw to be caught by useMutation's onError
  }
};

export const useSubmitPayoutForm = (refetchPayoutData: () => void, closeModal: () => void) => {
  return useMutation<unknown, AxiosError<APIErrorResponse>, IPayoutCreate>({
    mutationFn: handleSubmitPayoutForm,
    onSuccess: () => {
      console.log("Payout data successfully submitted");
      refetchPayoutData();
      closeModal();
      showNotification({
        title: "Data Berhasil Dikirim",
        message: "Data pembayaran berhasil disimpan",
        color: "green",
      });
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      console.error("Mutation error:", error);

      const errorMessage = error.response?.data?.message || error.message || "Terjadi kesalahan saat menyimpan data";

      console.log("Error message to display:", errorMessage);

      showNotification({
        title: "Data Gagal Disimpan",
        message: errorMessage,
        color: "red",
      });
    },
  });
};
