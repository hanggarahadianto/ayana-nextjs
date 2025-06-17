import { APIAxiosInstance } from "@/lib";

interface GetExpenseSummaryParams {
  companyId: string;
  page?: number;
  limit?: number;
  summaryOnly?: boolean;
  selectedCategory?: string;
  status: string;
  search?: string;
  startDate?: string; // format: YYYY-MM-DD
  endDate?: string; // format: YYYY-MM-DD
  sortBy?: string | null;
  sortOrder?: string | null;
}

export const getExpenseSummary = async ({
  companyId,
  page = 1,
  limit = 10,
  summaryOnly,
  selectedCategory,
  status,
  search,
  startDate,
  endDate,
  sortBy,
  sortOrder,
}: GetExpenseSummaryParams): Promise<IExpenseSummaryResponse> => {
  if (!companyId) {
    throw new Error("Company ID is required");
  }

  const queryParams = new URLSearchParams();

  queryParams.append("company_id", companyId);
  queryParams.append("page", String(page));
  queryParams.append("limit", String(limit));
  if (summaryOnly) queryParams.append("summary_only", "true");
  if (status) queryParams.append("status", status);
  if (selectedCategory) queryParams.append("debit_category", selectedCategory);
  if (search) queryParams.append("search", search);
  if (startDate) queryParams.append("start_date", startDate);
  if (endDate) queryParams.append("end_date", endDate);
  if (sortBy) queryParams.append("sort_by", sortBy);
  if (sortOrder) queryParams.append("sort_order", sortOrder);

  const url = `finance/get-expense-summary?${queryParams.toString()}`;

  try {
    const response = await APIAxiosInstance.get(url);
    return response.data as IExpenseSummaryResponse;
  } catch (error: any) {
    console.error("Error fetching expense summary:", error.message || error);
    throw new Error(error.message || "Failed to fetch expense summary");
  }
};
