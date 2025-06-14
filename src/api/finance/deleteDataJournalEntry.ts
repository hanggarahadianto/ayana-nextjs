import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { APIAxiosInstance } from "../../lib";
import { showNotification } from "@mantine/notifications";

const handleDeleteJournalEntry = async (ids: string[]): Promise<AxiosResponse<any>> => {
  return APIAxiosInstance.delete(`journal-entry/delete`, { data: { ids } });
};

export const useDeleteDataJournalEntry = (title?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => handleDeleteJournalEntry(ids),

    onSuccess: async (data) => {
      if (data.status === 200) {
        switch (title?.toLowerCase()) {
          case "Aset Tetap":
            await queryClient.refetchQueries({ queryKey: ["getFixedAssetData"], exact: false });
            break;
          case "Uang Masuk":
            await queryClient.refetchQueries({ queryKey: ["getCashinData"], exact: false });
            break;
          case "Piuatang":
            await queryClient.refetchQueries({ queryKey: ["getReceivableAssetData"], exact: false });
            break;
          case "Uang Keluar":
            await queryClient.refetchQueries({ queryKey: ["getCashOutData"], exact: false });
            break;
          case "Pengeluaran":
            await queryClient.refetchQueries({ queryKey: ["getExpenseSummaryData"], exact: false });
            break;
          case "Hutang Berjaan":
            await queryClient.refetchQueries({ queryKey: ["getOutstandingDebtByCompanyId"], exact: false });
            break;
          case "Transaksi":
            await queryClient.refetchQueries({ queryKey: ["getJournalEntryData"], exact: false });
            break;
          default:
            // Jika tidak ada kecocokan, refetch semua sebagai fallback
            await Promise.all([
              queryClient.refetchQueries({ queryKey: ["getCashinData"], exact: false }),
              queryClient.refetchQueries({ queryKey: ["getReceivableAssetData"], exact: false }),
              queryClient.refetchQueries({ queryKey: ["getFixedAssetData"], exact: false }),
              queryClient.refetchQueries({ queryKey: ["getCashOutData"], exact: false }),
              queryClient.refetchQueries({ queryKey: ["getExpenseSummaryData"], exact: false }),
              queryClient.refetchQueries({ queryKey: ["getOutstandingDebtByCompanyId"], exact: false }),
            ]);
            break;
        }
        showNotification({
          title: "Data Berhasil Dihapus",
          message: undefined,
          color: "green",
        });
      }
    },
    onError: (error: any) => {
      showNotification({
        title: "Data Gagal Dihapus",
        message: error.response?.data?.error || "Terjadi kesalahan",
        color: "red",
      });
    },
  });
};
