interface ITransactionCategory {
  id: string;
  name: string;
  debit_account_id: string;
  credit_account_id: string;
  category: string;
  description: string;
  company_id: string;
  created_at: string;
  updated_at: string;
  debit_account: IAccount;
  credit_account: IAccount;
}

interface ITransactionCategoryCreate {
  name: string;
  debit_account_id: string;
  credit_account_id: string;
  category: string;
  description: string;
  company_id: string;
}

interface ITransactionCategoryUpdate {
  id: string;
  name: string;
  debit_account_id: string;
  credit_account_id: string;
  category: string;
  description: string;
  company_id: string;
  created_at: string;
  updated_at: string;
  debit_account: IAccount;
  credit_account: IAccount;
}

interface ITransactionCategoryResponse {
  data: ITransactionCategory[];

  status: string;
  limit?: number;
  page?: number;
  total?: number;
}
