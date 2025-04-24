import { APIAxiosInstance } from "@/lib";

interface GetExpenseSummaryParams {
  companyId: string;
  page?: number;
  limit?: number;
  transactionType?: string | null;
  summaryOnly?: boolean; // ✅ dibuat optional
}

export const getExpenseSummary = async ({
  companyId,
  page = 1,
  limit = 10,
  transactionType = null,
  summaryOnly,
}: GetExpenseSummaryParams): Promise<IExpenseSummaryResponse> => {
  if (!companyId) {
    throw new Error("Company ID is required");
  }

  const queryParams = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (transactionType) {
    queryParams.append("type", transactionType);
  }

  if (summaryOnly) {
    queryParams.append("summary_only", "true"); // ✅ hanya kirim jika true
  }

  const url = `finance/get-expense-summary?${queryParams.toString()}`;

  try {
    const response = await APIAxiosInstance.get(url);
    return response.data as IExpenseSummaryResponse;
  } catch (error: any) {
    console.error("Error fetching expense summary:", error.message || error);
    throw new Error(error.message || "Failed to fetch expense summary");
  }
};
