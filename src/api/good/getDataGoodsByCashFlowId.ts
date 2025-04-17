import { APIAxiosInstance } from "../../lib";

export const getDataGoodsByCashFlowId = async (cashFlowId: string, page: number = 1, limit: number = 10) => {
  try {
    const response = await APIAxiosInstance.get(`good/getByCashFlowId`, {
      params: {
        cash_flow_id: cashFlowId,
        page,
        limit,
      },
    });

    return response.data as IGoodsResponse;
  } catch (error: any) {
    console.error("Error fetching goods data:", error.message || error);
    throw error;
  }
};
