import { APIAxiosInstance } from "@/lib";

interface GetAssetSummaryParams {
  companyId: string;
  page?: number;
  limit?: number;
  assetType?: string | null;
  summaryOnly?: boolean;
  category?: string;
}

export const getAssetSummary = async ({
  companyId,
  page = 1,
  limit = 10,
  assetType = null,
  summaryOnly,
  category,
}: GetAssetSummaryParams): Promise<IAssetSummaryResponse> => {
  if (!companyId) throw new Error("Company ID is required");

  const queryParams = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (assetType) queryParams.append("asset_type", assetType);
  if (summaryOnly) queryParams.append("summary_only", "true");
  if (category) queryParams.append("category", category);

  const url = `finance/get-asset-summary?${queryParams.toString()}`;

  try {
    const response = await APIAxiosInstance.get(url);
    return response.data as IAssetSummaryResponse;
  } catch (error: any) {
    console.error("Error fetching asset summary:", error.message || error);
    throw new Error(error.message || "Failed to fetch asset summary");
  }
};
