import { APIAxiosInstance } from "@/lib";

export const getCashSummary = async (companyId: string, page: number = 1, limit: number = 10) => {
  if (!companyId) {
    console.error("Company ID tidak ada!");
    return;
  }

  try {
    // Menambahkan page dan limit pada query string URL
    const url = `finance/get-cash-summary?company_id=${companyId}&page=${page}&limit=${limit}`;
    const response = await APIAxiosInstance.get(url);
    return response.data as ICashSummaryResponse; // Sesuai dengan interface yang kamu buat
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
