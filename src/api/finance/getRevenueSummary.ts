import { APIAxiosInstance } from "@/lib";

// ✅ update fungsi ini
interface RevenueParams {
  companyId: string;
  page?: number;
  limit?: number;
  debitCategory: string | null;
  creditCategory: string | null;
  revenueType?: string; // 👈 tambahkan jika perlu
  summaryOnly?: boolean;
  selectedCategory?: string;
  search?: string;
  startDate?: string; // 👈 tambahkan
  endDate?: string; // 👈 tambahkan
  sortBy?: string | null;
  sortOrder?: string | null;
}

export const getRevenueSummary = async ({
  companyId,
  page = 1,
  limit = 10,
  debitCategory,
  creditCategory,
  summaryOnly,
  selectedCategory,
  revenueType,
  search,
  startDate, // 👈 tambahkan
  endDate, // 👈 tambahkan
  sortBy,
  sortOrder,
}: RevenueParams): Promise<IRevenueSummaryResponse | undefined> => {
  if (!companyId) {
    console.error("Company ID tidak tersedia!");
    return;
  }
  const queryParams = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    limit: limit.toString(),
  });
  if (revenueType) queryParams.append("revenue_type", revenueType); // 👈 tambahkan jika perlu
  if (summaryOnly) queryParams.append("summary_only", "true");
  if (selectedCategory) queryParams.append("credit_category", selectedCategory);
  if (creditCategory) queryParams.append("credit_category", creditCategory);
  if (debitCategory) queryParams.append("debit_category", debitCategory);
  if (search) queryParams.append("search", search); // 🔍
  if (startDate) queryParams.append("start_date", startDate); // <- gunakan format YYYY-MM-DD
  if (endDate) queryParams.append("end_date", endDate);
  if (sortBy) queryParams.append("sort_by", sortBy);
  if (sortOrder) queryParams.append("sort_order", sortOrder);

  const url = `/finance/get-revenue-summary?${queryParams.toString()}`;

  try {
    const response = await APIAxiosInstance.get(url);
    return response.data as IRevenueSummaryResponse;
  } catch (error: any) {
    console.error("Gagal mengambil data revenue:", error.message || error);
    throw error;
  }
};
