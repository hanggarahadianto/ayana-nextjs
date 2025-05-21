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

// Ganti dengan path yang sesuai

export const initialValuesTransactionCategoryUpdate = (initialData?: ITransactionCategoryUpdate) => ({
  id: initialData?.id || "",
  name: initialData?.name || "",
  jenis_transaksi: initialData?.jenis_transaksi || "",
  status: initialData?.status || "",
  debit_account_id: initialData?.debit_account_id || "",
  debit_account_name: initialData?.debit_account_name || "",
  credit_account_id: initialData?.credit_account_id || "",
  credit_account_name: initialData?.credit_account_name || "",
  category: initialData?.category || "",
  transaction_type: initialData?.transaction_type || "",
  description: initialData?.description || "",
  company_id: initialData?.company_id || "",
});
