// src/api/employee/deletePresence.ts
import { APIAxiosInstance } from "@/lib";
import { useMutation } from "@tanstack/react-query";

const deletePresenceBulk = async (ids: string[]) => {
  const response = await APIAxiosInstance.delete("/employee/delete/presence", {
    data: { ids }, // Kirim array ID dalam body (bukan query)
  });

  return response.data;
};

export const useDeletePresenceBulk = (onSuccess?: () => void) =>
  useMutation({
    mutationFn: deletePresenceBulk,
    onSuccess,
  });
