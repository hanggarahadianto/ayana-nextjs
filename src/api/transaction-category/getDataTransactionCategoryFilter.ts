import { APIAxiosInstance } from "@/lib";

export const getTransactionCategoryByCategoryOnly = async (
  companyId: string,
  transactionType: string | null,

  debitAccountType: string | null,
  creditAccountType: string | null
): Promise<ITransactionCategorySelectByCategoryResponse> => {
  if (!companyId) {
    console.error("Company ID tidak tersedia!");
    throw new Error("Company ID tidak tersedia!");
  }

  const selectByCategory = "true";

  const queryParams = new URLSearchParams({
    company_id: companyId,
  });

  if (transactionType) {
    queryParams.append("transaction_type", transactionType);
  }
  // if (transactionType) {
  //   queryParams.append("transaction_type", transactionType);
  // }

  if (selectByCategory) {
    queryParams.append("select_by_category", "true");
  }

  if (debitAccountType) {
    queryParams.append("debit_account_type", debitAccountType);
  }

  if (creditAccountType) {
    queryParams.append("credit_account_type", creditAccountType);
  }

  const url = `/transaction-category/get?${queryParams.toString()}`;

  try {
    const response = await APIAxiosInstance.get(url);
    return response.data as ITransactionCategorySelectByCategoryResponse;
  } catch (error: any) {
    console.error("Gagal mengambil data kategori transaksi:", error.message || error);
    throw error;
  }
};
