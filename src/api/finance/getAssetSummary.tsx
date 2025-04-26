import { APIAxiosInstance } from "@/lib";

interface GetAssetSummaryParams {
  companyId: string;
  page?: number;
  limit?: number;
  transactionType?: string | null;
  summaryOnly?: boolean;
}

export const getAssetSummary = async ({
  companyId,
  page = 1,
  limit = 10,
  transactionType = null,
  summaryOnly,
}: GetAssetSummaryParams): Promise<IAssetSummaryResponse> => {
  if (!companyId) throw new Error("Company ID is required");

  const queryParams = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (transactionType) queryParams.append("type", transactionType);
  if (summaryOnly) queryParams.append("summary_only", "true");

  const url = `finance/get-asset-summary?${queryParams.toString()}`;

  try {
    const response = await APIAxiosInstance.get(url);
    return response.data as IAssetSummaryResponse;
  } catch (error: any) {
    console.error("Error fetching asset summary:", error.message || error);
    throw new Error(error.message || "Failed to fetch asset summary");
  }
};
