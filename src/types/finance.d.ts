interface IExpenseSummaryItem {
  id: string;
  invoice;
  description: string;
  amount: number;
  partner: string;
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
  transaction_id: string;
  invoice: string;
  description: string;
  partner: string;
  amount: number;
  partner: string;
  transaction_type: "payin" | "payout"; // bisa disesuaikan kalau ada lebih dari dua tipe
  status: "draft" | "paid" | "unpaid" | "completed" | "cancelled" | "done"; // sesuaikan dengan status yang valid di sistem

  company_id: string;
  date_inputed: string;
  due_date: string;
  is_repaid: boolean;
  installment: number;
  note: string;
  transaction_category_id: string;
  payment_date_status: string;
}

interface IDebtSummaryData {
  debtList: IDebtSummaryItem[];
  total_debt: number;
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
  category: string;
  partner: string;
  transaction_type: "payin" | "payout"; // bisa disesuaikan kalau ada lebih dari dua tipe
  status: "draft" | "paid" | "unpaid" | "completed" | "cancelled" | "done"; // sesuaikan dengan status yang valid di sistem
  company_id: string;
  date_inputed: string;
  due_date: string;
  is_repaid: boolean;
  installment: number;
  note: string;
  transaction_category_id: string;
  transaction_category: string;
  transaction_id: string;
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
interface ICashSummaryResponse {
  data: {
    available_cash: number;
    total_cash_in: number;
    total_cash_out: number;
  };
  message: string;
  status: string;
}
