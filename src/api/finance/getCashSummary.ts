import { APIAxiosInstance } from "@/lib";

export const getCashSummary = async (
  companyId: string,
  page: number = 1,
  limit: number = 10,
  transactionType?: string // optional param
) => {
  if (!companyId) {
    console.error("Company ID tidak ada!");
    return;
  }

  try {
    // Bangun query string dengan optional cash_flow_type
    let url = `finance/get-cash-summary?company_id=${companyId}&page=${page}&limit=${limit}`;
    if (transactionType) {
      url += `&transaction_type=${transactionType}`;
    }

    const response = await APIAxiosInstance.get(url);
    return response.data as ICashSummaryResponse;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
