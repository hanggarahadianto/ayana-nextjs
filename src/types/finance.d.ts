interface ICashSummaryItem {
  id: number;
  description: string;
  amount: number;
  date: string;
  status: string;
}

interface ICashSummaryData {
  cashList: ICashSummaryItem[];
  available_cash: number;
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
  date: string;
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
