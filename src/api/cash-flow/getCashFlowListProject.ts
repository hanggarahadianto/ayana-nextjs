import { APIAxiosInstance } from "..";

export const getDataCashFlowListByProjectId = async (id: string) => {
  try {
    const url = `cashflow/getByProjectId/${id}`;

    const response = await APIAxiosInstance.get(url);

    // console.log("Response:", response.data.data);
    return response.data as ICashFlowResponse;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
