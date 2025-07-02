import { APIAxiosInstance } from "@/lib";

interface GetAssetSummaryParams {
  companyId: string;
  page?: number;
  limit?: number;
  assetType?: string | null;
  debitCategory: string | null;
  creditCategory: string | null;
  summaryOnly?: boolean;
  search?: string; // 🔍 Tambahkan ini
  startDate?: string; // 👈 tambahkan
  endDate?: string; // 👈 tambahkan
  sortBy?: string | null;
  sortOrder?: string | null;
}

export const getAssetSummary = async ({
  companyId,
  page = 1,
  limit = 10,
  assetType = null,
  debitCategory,
  creditCategory,
  summaryOnly,
  search, // 🔍
  startDate, // 👈 tambahkan
  endDate, // 👈 tambahkan
  sortBy,
  sortOrder,
}: GetAssetSummaryParams): Promise<IAssetSummaryResponse> => {
  if (!companyId) throw new Error("Company ID is required");

  const queryParams = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (assetType) queryParams.append("asset_type", assetType);
  queryParams.append("summary_only", summaryOnly ? "true" : "false");
  if (debitCategory) queryParams.append("debit_category", debitCategory);
  if (creditCategory) queryParams.append("credit_category", creditCategory);
  if (search) queryParams.append("search", search); // 🔍
  if (startDate) queryParams.append("start_date", startDate); // <- gunakan format YYYY-MM-DD
  if (endDate) queryParams.append("end_date", endDate);
  if (sortBy) queryParams.append("sort_by", sortBy);
  if (sortOrder) queryParams.append("sort_order", sortOrder);

  const url = `finance/get-asset-summary?${queryParams.toString()}`;

  try {
    const response = await APIAxiosInstance.get(url);
    return response.data as IAssetSummaryResponse;
  } catch (error: any) {
    console.error("Error fetching asset summary:", error.message || error);
    throw new Error(error.message || "Failed to fetch asset summary");
  }
};
