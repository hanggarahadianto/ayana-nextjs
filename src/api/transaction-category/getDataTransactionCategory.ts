import { APIAxiosInstance } from "@/lib";

export interface GetTransactionCategoryParams {
  companyId: string;
  page?: number;
  limit?: number;
  transactionType?: string | null;
  selectedDebitAccount: string | null;
  selectedCreditAccount: string | null;
  selectedDebitCategory?: string | null;
  selectedCreditCategory?: string | null;
  status?: string | null;
  select?: boolean;
}

export const getDataTransactionCategory = async ({
  companyId,
  page = 1,
  limit = 10,
  transactionType,
  selectedDebitAccount,
  selectedCreditAccount,
  selectedDebitCategory,
  selectedCreditCategory,
  status,
  select = false,
}: GetTransactionCategoryParams) => {
  if (!companyId) {
    console.error("Company ID tidak ada!");
    return;
  }

  const params = new URLSearchParams();
  params.append("company_id", companyId);

  if (select) {
    params.append("select", "true");
  } else {
    params.append("page", String(page));
    params.append("limit", String(limit));
  }
  if (transactionType) {
    params.append("transaction_type", transactionType);
  }
  if (selectedDebitAccount) {
    params.append("debit_account_type", selectedDebitAccount);
  }
  if (selectedCreditAccount) {
    params.append("credit_account_type", selectedCreditAccount);
  }
  if (selectedDebitCategory) {
    params.append("debit_category", selectedDebitCategory);
  }
  if (selectedCreditCategory) {
    params.append("credit_category", selectedCreditCategory);
  }
  if (status) {
    params.append("status", status);
  }

  const url = `transaction-category/get?${params.toString()}`;
  const response = await APIAxiosInstance.get(url);
  return response.data as ITransactionCategoryResponse;
};
