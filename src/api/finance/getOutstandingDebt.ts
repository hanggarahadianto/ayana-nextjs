import { APIAxiosInstance } from "@/lib";

export const getOutstandingDebt = async (
  companyId: string,
  transaction_type: string,
  transactionStatus: string,
  page = 1,
  limit: number
) => {
  if (!companyId) {
    console.error("Company ID tidak ada!");
    return;
  }

  try {
    let url = `finance/get-outstanding-debt?company_id=${companyId}&transaction_type=${transaction_type}&status=${transactionStatus}&page=${page}&limit=${limit}`;
    // if (type) {
    //   url += `&type=${encodeURIComponent(type)}`;
    // }

    // console.log("url dapatkan select", url);

    const response = await APIAxiosInstance.get(url);
    return response.data as IJournalEntryResponse;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
