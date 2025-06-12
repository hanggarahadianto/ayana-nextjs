import { APIAxiosInstance } from "@/lib";

// ✅ update fungsi ini
interface GetJournalEntryParams {
  companyId: string;
  page?: number;
  limit?: number;
  summaryOnly?: boolean;
  selectedCategory?: string;
  search?: string;
  startDate?: string; // 👈 tambahkan
  endDate?: string; // 👈 tambahkan
}

export const getJournalEntryData = async ({
  companyId,
  page = 1,
  limit = 10,
  summaryOnly,
  selectedCategory,
  search,
  startDate, // 👈 tambahkan
  endDate, // 👈 tambahkan
}: GetJournalEntryParams): Promise<IJournalEntryResponse | undefined> => {
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
  if (search) queryParams.append("search", search); // 🔍
  if (selectedCategory) queryParams.append("credit_category", selectedCategory);
  if (startDate) queryParams.append("start_date", startDate); // <- gunakan format YYYY-MM-DD
  if (endDate) queryParams.append("end_date", endDate);

  const url = `/journal-entry/get?${queryParams.toString()}`;

  try {
    const response = await APIAxiosInstance.get(url);
    return response.data as IJournalEntryResponse;
  } catch (error: any) {
    console.error("Gagal mengambil data outstanding debt:", error.message || error);
    throw error;
  }
};
