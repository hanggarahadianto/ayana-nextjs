import { useMutation } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";
import { AxiosError } from "axios";

interface APIErrorResponse {
  message?: string;
  error?: string;
  status?: string;
  // Add other possible error response fields
}

const handleSubmitJournalEntry = async (values: IJournalEntryCreate) => {
  const response = await APIAxiosInstance.post("journal-entry/post", values);
  return response.data;
};

export const useSubmitJournalEntry = (refetchData: () => void, closeModal: () => void) => {
  return useMutation<void, AxiosError<APIErrorResponse>, IJournalEntryCreate>({
    mutationFn: handleSubmitJournalEntry,
    onSuccess: () => {
      try {
        // Jalankan refetch dan tampilkan notifikasi
        refetchData(); // Gunakan optional chaining
        closeModal?.();

        showNotification({
          title: "Data Berhasil Dikirim",
          message: "Data transaksi berhasil disimpan",
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
      console.error("TransactionCategory submission error:", error);

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
