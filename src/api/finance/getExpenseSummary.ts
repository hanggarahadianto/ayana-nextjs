import { APIAxiosInstance } from "@/lib";

interface GetExpenseSummaryParams {
  companyId: string;
  page?: number;
  limit?: number;
  summaryOnly?: boolean; // ✅ dibuat optional
  status: string;
  search?: string; // ✅ untuk pencarian
}

export const getExpenseSummary = async ({
  companyId,
  page = 1,
  limit = 10,
  summaryOnly,
  status,
  search,
}: GetExpenseSummaryParams): Promise<IExpenseSummaryResponse> => {
  if (!companyId) {
    throw new Error("Company ID is required");
  }

  const queryParams = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (summaryOnly) queryParams.append("summary_only", "true"); // ✅ hanya kirim jika true
  if (status) queryParams.append("status", status); // ✅ hanya kirim jika true
  if (search) queryParams.append("search", search); // 🔍

  const url = `finance/get-expense-summary?${queryParams.toString()}`;

  try {
    const response = await APIAxiosInstance.get(url);
    return response.data as IExpenseSummaryResponse;
  } catch (error: any) {
    console.error("Error fetching expense summary:", error.message || error);
    throw new Error(error.message || "Failed to fetch expense summary");
  }
};
