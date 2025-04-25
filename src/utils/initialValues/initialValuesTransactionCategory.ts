export const initialValuesTransactionCategoryCreate = (companyId?: string): ITransactionCategoryCreate => ({
  name: "",
  debit_account_id: "",
  debit_account_name: "",
  credit_account_name: "",
  credit_account_id: "",
  category: "",
  description: "",

  company_id: companyId || "",
});
