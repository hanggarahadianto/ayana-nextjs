import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { APIAxiosInstance } from "../../lib";

const handleDeleteJournalEntry = async (idToDelete: string): Promise<AxiosResponse<any>> => {
  return APIAxiosInstance.delete(`journal-entry/delete/${idToDelete}`);
};

export const useDeleteDataJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (idToDelete: string) => handleDeleteJournalEntry(idToDelete), // Define mutation function explicitly
    onSuccess: async (data) => {
      if (data.status === 200) {
        await Promise.all([
          queryClient.refetchQueries({
            queryKey: ["getCashinData"],
            exact: false,
          }),
        ]);
        await Promise.all([
          queryClient.refetchQueries({
            queryKey: ["getReceivableAssetData"],
            exact: false,
          }),
        ]);
        await Promise.all([
          queryClient.refetchQueries({
            queryKey: ["getFixedAssetData"],
            exact: false,
          }),
        ]);
        await Promise.all([
          queryClient.refetchQueries({
            queryKey: ["getCashOutData"],
            exact: false,
          }),
        ]);
        await Promise.all([
          queryClient.refetchQueries({
            queryKey: ["getExpenseSummaryData"],
            exact: false,
          }),
        ]);
        await Promise.all([
          queryClient.refetchQueries({
            queryKey: ["getOutstandingDebtByCompanyId"],
            exact: false,
          }),
        ]);
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
