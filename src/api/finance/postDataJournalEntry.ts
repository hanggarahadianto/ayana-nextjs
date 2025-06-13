import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";
import { AxiosError } from "axios";

interface APIErrorResponse {
  message?: string;
  error?: string;
  status?: string;
}

const handleSubmitJournalEntry = async (values: IJournalEntryCreate[]) => {
  const response = await APIAxiosInstance.post("journal-entry/post", values);
  return response.data;
};

export const useSubmitJournalEntry = (closeModal: () => void, companyId?: string, transactionType?: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<APIErrorResponse>, IJournalEntryCreate[]>({
    mutationFn: handleSubmitJournalEntry,
    onSuccess: async () => {
      try {
        if (companyId) {
          if (transactionType === "payin") {
            // Hanya refetch asset-related queries
            await Promise.all([
              queryClient.refetchQueries({ queryKey: ["getCashinData", companyId], exact: false }),
              queryClient.refetchQueries({ queryKey: ["getFixedAssetData", companyId], exact: false }),
              queryClient.refetchQueries({ queryKey: ["getReceivableAssetData", companyId], exact: false }),
            ]);
          } else {
            // Refetch semua
            await Promise.all([
              queryClient.refetchQueries({ queryKey: ["getCashOutData", companyId], exact: false }),
              queryClient.refetchQueries({ queryKey: ["getExpenseSummaryData", companyId], exact: false }),
              queryClient.refetchQueries({ queryKey: ["getOutstandingDebtByCompanyId", companyId], exact: false }),
            ]);
          }
        }

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
          message: "Data berhasil disimpan tetapi ada masalah saat memperbarui tampilan",
          color: "yellow",
        });
      }
    },
    onError: (error) => {
      console.error("Journal Entry submission error:", error);

      const errorMessage =
        error.response?.data?.message || error.response?.data?.error || error.message || "Terjadi kesalahan saat menyimpan data transaksi";

      showNotification({
        title: "Data Gagal Disimpan",
        message: errorMessage,
        color: "red",
      });
    },
  });
};
