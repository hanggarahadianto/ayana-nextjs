// export const getInitialValuesTransactionCategory = (initialData?: ITransactionCategory) => ({
//   id: initialData?.id ?? "",
//   name: initialData?.name ?? "",
//   debit_account_id: initialData?.debit_account_id ?? "",
//   credit_account_id: initialData?.credit_account_id ?? "",
//   category: initialData?.category ?? "",
//   description: initialData?.description ?? "",
//   company_id: initialData?.company_id ?? "",
// });

// sesuaikan dengan path kamu

export const initialValuesTransactionCategoryCreate: ITransactionCategoryCreate = {
  name: "",
  debit_account_id: "",
  credit_account_id: "",
  category: "",
  description: "",
  company_id: "",
};
