import { APIAxiosInstance } from "@/lib";

interface GetAvailableCashParams {
  companyId: string;
  page?: number;
  limit?: number;
  assetType?: string | null;
  summaryOnly?: boolean;
}

export const getAvailableCash = async ({ companyId }: GetAvailableCashParams): Promise<ICashSummaryResponse> => {
  if (!companyId) throw new Error("Company ID is required");

  const queryParams = new URLSearchParams({
    company_id: companyId,
  });

  const url = `finance/get-available-cash?${queryParams.toString()}`;

  try {
    const response = await APIAxiosInstance.get(url);
    return response.data as ICashSummaryResponse;
  } catch (error: any) {
    console.error("Error fetching asset summary:", error.message || error);
    throw new Error(error.message || "Failed to fetch asset summary");
  }
};
