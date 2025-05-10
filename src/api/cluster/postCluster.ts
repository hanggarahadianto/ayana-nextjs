import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";

const handleSubmitClusterForm = async (values: IClusterCreate) => {
  const response = await APIAxiosInstance.post(`cluster/post`, values);
  return response.data;
};

export const useSubmitClusterForm = (closeModal: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: IClusterCreate) => handleSubmitClusterForm(values),
    onSuccess: async (data: any) => {
      if (data) {
        await Promise.all([
          queryClient.refetchQueries({
            queryKey: ["getClusterData"],
            exact: false,
          }),
          // queryClient.refetchQueries({
          //   queryKey: ["getCashOutData", companyId],

          //   exact: false,
          // }),
          // queryClient.refetchQueries({
          //   queryKey: ["getExpenseSummaryData", companyId],
          //   exact: false,
          // }),
          // queryClient.refetchQueries({
          //   queryKey: ["getOutstandingDebtByCompanyId", companyId],
          //   exact: false,
          // }),
          // queryClient.refetchQueries({
          //   queryKey: ["getFixedAssetData", companyId],
          //   exact: false,
          // }),
          // queryClient.refetchQueries({
          //   queryKey: ["getReceivableAssetData", companyId],
          //   exact: false,
          // }),
        ]);
      }
      closeModal();
    },
    onError: (data: any) => {
      showNotification({
        title: "Data Gagal Disimpan",
        message: `${data.message}`,
        color: "red",
      });
    },
    onSettled: () => {},
  });
};
