import { APIAxiosInstance } from "@/lib";
interface GetOutstandingDebtParams {
  companyId: string;
  page?: number;
  limit?: number;
  debtType: string;
  summaryOnly?: boolean;
  selectedCategory?: string;
  search?: string;
  startDate?: string; // 👈 tambahkan
  endDate?: string; // 👈 tambahkan
}

export const getOutstandingDebt = async ({
  companyId,
  page = 1,
  limit = 10,
  debtType,
  summaryOnly,
  selectedCategory,
  search,
  startDate, // 👈 tambahkan
  endDate, // 👈 tambahkan
}: GetOutstandingDebtParams): Promise<IDebtSummaryResponse | undefined> => {
  if (!companyId) {
    console.error("Company ID tidak tersedia!");
    return;
  }
  const queryParams = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (summaryOnly) queryParams.append("summary_only", "true");
  if (debtType) queryParams.append("debt_type", debtType);
  if (search) queryParams.append("search", search); // 🔍
  if (selectedCategory) queryParams.append("credit_category", selectedCategory);
  if (startDate) queryParams.append("start_date", startDate); // <- gunakan format YYYY-MM-DD
  if (endDate) queryParams.append("end_date", endDate);

  const url = `/finance/get-outstanding-debt?${queryParams.toString()}`;

  try {
    const response = await APIAxiosInstance.get(url);
    return response.data as IDebtSummaryResponse;
  } catch (error: any) {
    console.error("Gagal mengambil data outstanding debt:", error.message || error);
    throw error;
  }
};
