import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";
import { AxiosError } from "axios";

interface APIErrorResponse {
  message?: string;
  error?: string;
  status?: string;
}

const handleSubmitJournalEntryUpdate = async (value: IJournalEntryUpdate) => {
  const response = await APIAxiosInstance.put(`journal-entry/update`, value);
  return response.data;
};

export const useSubmitJournalEntryUpdate = (closeModal: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<APIErrorResponse>, IJournalEntryUpdate>({
    mutationFn: async (value) => {
      return await handleSubmitJournalEntryUpdate(value);
    },
    onSuccess: async (data, variables) => {
      try {
        const companyId = variables.company_id;
        await Promise.all([
          queryClient.refetchQueries({ queryKey: ["getCashinData", companyId] }),
          queryClient.refetchQueries({ queryKey: ["getCashOutData", companyId] }),
          queryClient.refetchQueries({ queryKey: ["getExpenseSummaryData", companyId] }),
          queryClient.refetchQueries({ queryKey: ["getOutstandingDebtByCompanyId", companyId] }),
          queryClient.refetchQueries({ queryKey: ["getFixedAssetData", companyId] }),
          queryClient.refetchQueries({ queryKey: ["getReceivableAssetData", companyId] }),
          queryClient.refetchQueries({ queryKey: ["getEquitySummaryData", companyId] }),
          queryClient.refetchQueries({ queryKey: ["getInventoryAssetData", companyId] }),
        ]);

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
