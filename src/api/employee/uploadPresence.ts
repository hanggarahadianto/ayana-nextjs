import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "@/lib";

const handleUploadPresence = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await APIAxiosInstance.post("/employee/upload-presence", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const useUploadPresence = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => handleUploadPresence(file),
    onSuccess: async (data: any) => {
      showNotification({
        title: "Upload Berhasil",
        message: data.message || "Presensi berhasil diunggah",
        color: "green",
      });

      await queryClient.refetchQueries({
        queryKey: ["getEmployeeData"],
      });

      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err: any) => {
      showNotification({
        title: "Upload Gagal",
        message: err?.message || "Terjadi kesalahan saat mengunggah presensi",
        color: "red",
      });
    },
  });
};
