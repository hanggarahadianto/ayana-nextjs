import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { APIAxiosInstance } from "../../lib";

// Function to delete a project
const handleFinishProject = async (payload: {
  id: string;
  project_status: string;
  project_finished: Date;
}): Promise<AxiosResponse<any>> => {
  return APIAxiosInstance.put(`project/finish-project/${payload.id}`, payload);
};

export const useFinishDataProject = (refetchProjectData: () => void) => {
  return useMutation({
    mutationFn: (payload: { id: string; project_status: string; project_finished: Date }) => handleFinishProject(payload),
    onSuccess: (data) => {
      if (data.status === 200) {
        refetchProjectData();
        showNotification({
          title: "Data Berhasil Diperbarui",
          message: undefined,
          color: "green",
        });
      } else {
        showNotification({
          title: "Error",
          message: data.data?.message || "Terjadi kesalahan",
          color: "red",
        });
      }
    },
    onError: (error: any) => {
      showNotification({
        title: "Data Gagal Diperbarui",
        message: error.response?.data?.message || "Terjadi kesalahan",
        color: "red",
      });
    },
  });
};
