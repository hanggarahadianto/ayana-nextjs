import { APIAxiosInstance } from "@/lib";
// pastikan interface ini benar

export const getOutstandingDebt = async (
  companyId: string,
  transaction_type: string,
  transactionStatus: string,
  page = 1,
  limit = 10
): Promise<IDebtSummaryResponse | undefined> => {
  if (!companyId) {
    console.error("Company ID tidak tersedia!");
    return;
  }

  try {
    const params = new URLSearchParams({
      company_id: companyId,
      transaction_type: transaction_type,
      status: transactionStatus,
      page: page.toString(),
      limit: limit.toString(),
    });

    const url = `/finance/get-outstanding-debt?${params.toString()}`;
    const response = await APIAxiosInstance.get(url);
    return response.data as IDebtSummaryResponse;
  } catch (error: any) {
    console.error("Gagal mengambil data outstanding debt:", error.message || error);
    throw error;
  }
};
