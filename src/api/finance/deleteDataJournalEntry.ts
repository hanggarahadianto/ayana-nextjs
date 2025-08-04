import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { APIAxiosInstance } from "../../lib";
import { showNotification } from "@mantine/notifications";

const handleDeleteJournalEntry = async (ids: string[]): Promise<AxiosResponse<any>> => {
  return APIAxiosInstance.delete(`journal-entry/delete`, { data: { ids } });
};

export const useDeleteDataJournalEntry = (title: string) => {
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
          case "barang dagangan":
            await queryClient.invalidateQueries({ queryKey: ["getInventoryAssetData"], exact: false });
            break;
          case "piutang":
            await queryClient.invalidateQueries({ queryKey: ["getReceivableAssetData"], exact: false });
            break;
          case "uang keluar":
            await queryClient.invalidateQueries({ queryKey: ["getCashOutData"], exact: false });
            break;
          case "pengeluaran":
            await queryClient.invalidateQueries({ queryKey: ["getExpenseSummaryData"], exact: false });
            break;
          case "hutang berjalan":
            await queryClient.invalidateQueries({ queryKey: ["getOutstandingDebtByCompanyId"], exact: false });
            break;
          case "hutang lunas":
            await queryClient.invalidateQueries({ queryKey: ["getOutstandingDebtByCompanyId"], exact: false });
            break;
          case "modal disetor":
            await queryClient.invalidateQueries({ queryKey: ["getEquitySummaryData"], exact: false });
            break;
          case "modal ditarik":
            await queryClient.invalidateQueries({ queryKey: ["getOutstandingDebtByCompanyId"], exact: false });
            break;
          case "pendapatan terealisasi":
            await queryClient.invalidateQueries({ queryKey: ["getRevenueSummaryData"], exact: false });
            break;
          case "transaksi":
            await queryClient.invalidateQueries({
              predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === "getJournalEntryData",
            });
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
