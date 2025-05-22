interface ITransactionCategory {
  id: string;
  name: string;
  transaction_label: string; // hanya untuk UI
  status: string;

  debit_account_id: string;
  // debit_account_name: string;
  debit_account_type: string;
  credit_account_id: string;
  // credit_account_name: string;
  credit_account_type: string;
  transaction_type: string;
  category: string;
  description: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}

interface ITransactionCategoryCreate {
  name: string;
  transaction_label: string; // hanya untuk UI

  status: string;
  debit_account_id: string;
  debit_account_type: string;
  credit_account_id: string;
  credit_account_type: string;
  transaction_type: string;
  category: string;
  description: string;
  company_id: string;
}

interface ITransactionCategoryUpdate {
  id: string;
  name: string;
  transaction_label: string; // hanya untuk UI
  status: string;
  debit_account_id: string;
  debit_account_type: string;
  credit_account_id: string;
  credit_account_type: string;
  category: string;
  transaction_type: string;
  description: string;
  company_id: string;
}

interface ITransactionCategoryResponse {
  data: ITransactionCategory[];
  status: string;
  limit?: number;
  page?: number;
  total?: number;
}
interface ITransactionCategorySelectByCategoryResponse {
  data: string[];
  status: string;
}
