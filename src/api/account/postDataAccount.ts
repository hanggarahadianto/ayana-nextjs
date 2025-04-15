import { useMutation } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "..";
import { AxiosError } from "axios";

interface APIErrorResponse {
  message?: string;
  error?: string;
  status?: string;
  // Add other possible error response fields
}

const handleSubmitAccountForm = async (values: IAccountCreate) => {
  console.log("Submitting account form with values:", values);
  const response = await APIAxiosInstance.post("account/post", values);
  return response.data;
};

export const useSubmitAccountForm = (refetchAccountData: () => void, closeModal: () => void) => {
  return useMutation<void, AxiosError<APIErrorResponse>, IAccountCreate>({
    mutationFn: handleSubmitAccountForm,
    onSuccess: () => {
      try {
        console.log("Account data successfully submitted");

        // Jalankan refetch dan tampilkan notifikasi
        refetchAccountData?.(); // Gunakan optional chaining
        closeModal?.();

        showNotification({
          title: "Data Berhasil Dikirim",
          message: "Data akun berhasil disimpan",
          color: "green",
        });
      } catch (e) {
        console.error("Error in onSuccess handler:", e);
        showNotification({
          title: "Peringatan",
          message: "Data berhasil disimpan tetapi ada masalah tampilan",
          color: "yellow",
        });
      }
    },
    onError: (error) => {
      console.error("Account submission error:", error);

      const errorMessage =
        error.response?.data?.message || error.response?.data?.error || error.message || "Terjadi kesalahan saat menyimpan data akun";

      showNotification({
        title: "Data Gagal Disimpan",
        message: errorMessage,
        color: "red",
      });
    },
  });
};
