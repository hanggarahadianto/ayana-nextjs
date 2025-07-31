import { APIAxiosInstance } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface DownloadJournalPayload {
  entries: IJournalEntryItem[];
  title: string;
  startDate: string;
  endDate: string;
  selectedCategory?: string;
  searchTerm?: string;
}

const handleDownloadJournalTransaction = async (payload: DownloadJournalPayload) => {
  const response = await APIAxiosInstance.post("journal-entry/download-transaction", payload, {
    responseType: "blob",
  });

  const blob = new Blob([response.data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const filename = `${payload.title || "journal-transaction"}.xlsx`;
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return response.data;
};

export const useDownloadJournalTransaction = (closeModal?: () => void, companyId?: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, DownloadJournalPayload>({
    mutationFn: handleDownloadJournalTransaction,
    onSuccess: () => {
      closeModal?.();
      // Optional: refresh data if needed
      // queryClient.invalidateQueries(["journal-entries", companyId]);
    },
    onError: (error) => {
      console.error("❌ Gagal mengunduh jurnal:", error.message);
    },
  });
};
