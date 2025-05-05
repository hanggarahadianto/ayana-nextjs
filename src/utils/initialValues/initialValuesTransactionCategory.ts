export const initialValuesTransactionCategoryCreate = (companyId?: string): ITransactionCategoryCreate => ({
  name: "",
  jenis_transaksi: "",
  status: "",
  debit_account_id: "",
  debit_account_name: "",
  credit_account_name: "",
  credit_account_id: "",
  transaction_type: "",
  category: "",
  description: "",

  company_id: companyId || "",
});
