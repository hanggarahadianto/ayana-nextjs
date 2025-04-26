interface ICashSummaryItem {
  id: number;
  description: string;
  amount: number;
  date: string;
  status: string;
  note: string;
  cash_flow_type: string;
  category: string;
}

interface ICashSummaryData {
  cashList: ICashSummaryItem[];
  total_cashin: number;
  net_assets: number;
  page: number;
  limit: number;
  total: number;
}

interface ICashSummaryResponse {
  data: ICashSummaryData;
  message: string;
  status: string;
}

interface IExpenseSummaryItem {
  id: number;
  description: string;
  amount: number;
  date_inputed: string;
  status: string;
}

interface IExpenseSummaryData {
  expenseList: IExpenseSummaryItem[];
  total_expense: number;
  page: number;
  limit: number;
  total: number;
}

interface IExpenseSummaryResponse {
  data: IExpenseSummaryData;
  message: string;
  status: string;
}

interface IDebtSummaryItem {
  id: string;
  invoice: string;
  description: string;
  amount: number;
  partner: string;
  transaction_type: string;
  status: string;
  company_id: string;
  date_inputed: string;
  due_date: string;
  is_repaid: boolean;
  installment: number;
  note: string;
}

interface IDebtSummaryData {
  debtList: IDebtSummaryItem[];
  total_outstandingDebt: number;
  page: number;
  limit: number;
  total: number;
}

interface IDebtSummaryResponse {
  data: IDebtSummaryData;
  message: string;
  status: string;
}

interface IAssetSummaryItem {
  id: string;
  invoice: string;
  description: string;
  amount: number;
  partner: string;
  transaction_type: string;
  status: string;
  company_id: string;
  date_inputed: string;
  due_date: string;
  is_repaid: boolean;
  installment: number;
  note: string;
}

interface IAssetSummaryData {
  assetList: IAssetSummaryItem[];
  total_asset: number;
  page: number;
  limit: number;
  total: number;
}

interface IAssetSummaryResponse {
  data: IAssetSummaryData;
  message: string;
  status: string;
}
