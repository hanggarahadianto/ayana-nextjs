import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { APIAxiosInstance } from "../../lib";
import { showNotification } from "@mantine/notifications";
import { DASHBOARD_QUERY_KEYS, TITLE_QUERY_KEY_MAP } from "@/constants/stats";

const handleDeleteJournalEntry = async (ids: string[]): Promise<AxiosResponse<any>> => {
  return APIAxiosInstance.delete(`journal-entry/delete`, { data: { ids } });
};

type DeleteJournalParams = {
  ids: string[];
  refetchStatKeys?: string[];
  forDashboard?: boolean;
};

export const useDeleteDataJournalEntry = (title: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ids }: DeleteJournalParams) => handleDeleteJournalEntry(ids),

    onSuccess: async (_data, variables) => {
      const { refetchStatKeys = [], forDashboard } = variables;

      if (forDashboard) {
        // Hanya invalidate key yang diminta
        const keysToInvalidate =
          refetchStatKeys.length > 0 ? DASHBOARD_QUERY_KEYS.filter((key) => refetchStatKeys.includes(key)) : DASHBOARD_QUERY_KEYS;

        for (const key of keysToInvalidate) {
          await queryClient.invalidateQueries({ queryKey: [key] });
        }
      } else {
        const keyOrPredicate = TITLE_QUERY_KEY_MAP[title?.toLowerCase()];
        if (typeof keyOrPredicate === "string") {
          await queryClient.invalidateQueries({ queryKey: [keyOrPredicate] });
        } else if (typeof keyOrPredicate === "function") {
          await queryClient.invalidateQueries({ predicate: keyOrPredicate });
        }
      }

      showNotification({
        title: "Data Berhasil Dihapus",
        message: "",
        color: "green",
      });
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
