import { APIAxiosInstance } from "@/lib";

// ✅ update fungsi ini
interface EquityParams {
  companyId: string;
  page?: number;
  limit?: number;
  equityType?: string; // 👈 tambahkan jika perlu
  summaryOnly?: boolean;
  search?: string;
  startDate?: string; // 👈 tambahkan
  endDate?: string; // 👈 tambahkan
}

export const getEquitySummary = async ({
  companyId,
  page = 1,
  limit = 10,
  summaryOnly,
  equityType,
  search,
  startDate, // 👈 tambahkan
  endDate, // 👈 tambahkan
}: EquityParams): Promise<IEquitySummaryResponse | undefined> => {
  if (!companyId) {
    console.error("Company ID tidak tersedia!");
    return;
  }
  const queryParams = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    limit: limit.toString(),
  });
  if (equityType) queryParams.append("equity_type", equityType); // 👈 tambahkan jika perlu
  if (summaryOnly) queryParams.append("summary_only", "true");
  if (search) queryParams.append("search", search); // 🔍
  if (startDate) queryParams.append("start_date", startDate); // <- gunakan format YYYY-MM-DD
  if (endDate) queryParams.append("end_date", endDate);

  const url = `/finance/get-equity-summary?${queryParams.toString()}`;

  try {
    const response = await APIAxiosInstance.get(url);
    return response.data as IEquitySummaryResponse;
  } catch (error: any) {
    console.error("Gagal mengambil data outstanding debt:", error.message || error);
    throw error;
  }
};
