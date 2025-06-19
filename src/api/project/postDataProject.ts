import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import { APIAxiosInstance } from "../../lib";

interface APIErrorResponse {
  message?: string;
  error?: string;
  status?: string;
}

interface UseSubmitProjectCreateOptions {
  onSuccess?: () => void;
  onClose?: () => void;
  companyId?: string;
  transactionType?: "payin" | "payout";
}

const handleSubmitProjectForm = async (values: IProjectCreate) => {
  const response = await APIAxiosInstance.post(`/project/post`, values);
  return response.data;
};

export const useSubmitProjectCreate = ({ onSuccess, onClose, companyId, transactionType }: UseSubmitProjectCreateOptions) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<APIErrorResponse>, IProjectCreate>({
    mutationFn: handleSubmitProjectForm,
    onSuccess: async () => {
      try {
        if (companyId) {
          const payinQueries = [
            queryClient.refetchQueries({ queryKey: ["getCashinData", companyId], exact: false }),
            queryClient.refetchQueries({ queryKey: ["getFixedAssetData", companyId], exact: false }),
            queryClient.refetchQueries({ queryKey: ["getReceivableAssetData", companyId], exact: false }),
          ];

          const payoutQueries = [
            queryClient.refetchQueries({ queryKey: ["getCashOutData", companyId], exact: false }),
            queryClient.refetchQueries({ queryKey: ["getExpenseSummaryData", companyId], exact: false }),
            queryClient.refetchQueries({ queryKey: ["getOutstandingDebtByCompanyId", companyId], exact: false }),
          ];

          await Promise.all(transactionType === "payin" ? payinQueries : payoutQueries);
        }

        onSuccess?.();
        onClose?.();

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
      console.error("Project submission error:", error);

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
