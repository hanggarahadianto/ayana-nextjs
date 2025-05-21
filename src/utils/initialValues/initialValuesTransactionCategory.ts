import { transactionLabel } from "@/constants/dictionary";

export const initialValuesTransactionCategoryCreate = (companyId?: string): ITransactionCategoryCreate => ({
  name: "",
  transaction_label: "",
  status: "",
  debit_account_id: "",
  debit_account_type: "",
  credit_account_type: "",
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
  transaction_label: initialData?.transaction_label || "",
  status: initialData?.status || "",
  debit_account_id: initialData?.debit_account_id || "",
  debit_account_type: initialData?.debit_account_type || "",
  credit_account_id: initialData?.credit_account_id || "",
  credit_account_type: initialData?.credit_account_type || "",
  category: initialData?.category || "",
  transaction_type: initialData?.transaction_type || "",
  description: initialData?.description || "",
  company_id: initialData?.company_id || "",
});
