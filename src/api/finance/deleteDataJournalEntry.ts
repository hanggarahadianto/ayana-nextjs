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
        const lowerTitle = title?.toLowerCase();

        switch (lowerTitle) {
          case "aset tetap":
            await queryClient.invalidateQueries({ queryKey: ["getFixedAssetData"], exact: false });
            break;
          case "uang masuk":
            await queryClient.invalidateQueries({ queryKey: ["getCashinData"], exact: false });
            break;
          case "piuatang":
            await queryClient.invalidateQueries({ queryKey: ["getReceivableAssetData"], exact: false });
            break;
          case "uang keluar":
            await queryClient.invalidateQueries({ queryKey: ["getCashOutData"], exact: false });
            break;
          case "pengeluaran":
            await queryClient.invalidateQueries({ queryKey: ["getExpenseSummaryData"], exact: false });
            break;
          case "hutang berjaan":
            await queryClient.invalidateQueries({ queryKey: ["getOutstandingDebtByCompanyId"], exact: false });
            break;
          case "transaksi":
            await queryClient.invalidateQueries({
              predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === "getJournalEntryData",
            });
            break;
          default:
            // fallback refetch semua
            await Promise.all([
              queryClient.invalidateQueries({ queryKey: ["getCashinData"], exact: false }),
              queryClient.invalidateQueries({ queryKey: ["getReceivableAssetData"], exact: false }),
              queryClient.invalidateQueries({ queryKey: ["getFixedAssetData"], exact: false }),
              queryClient.invalidateQueries({ queryKey: ["getCashOutData"], exact: false }),
              queryClient.invalidateQueries({ queryKey: ["getExpenseSummaryData"], exact: false }),
              queryClient.invalidateQueries({ queryKey: ["getOutstandingDebtByCompanyId"], exact: false }),
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
