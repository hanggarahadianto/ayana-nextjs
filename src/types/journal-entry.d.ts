interface IJournalEntryItem {
  id: string;
  transaction_id: string;
  invoice: string;
  description: string;
  transaction_category_id: string;
  transaction_category_name?: string; // Optional jika tidak selalu ada
  amount: number;
  installment: number;
  partner: string;
  transaction_type: "payin" | "payout"; // bisa disesuaikan kalau ada lebih dari dua tipe
  status: "paid" | "unpaid" | "completed" | "cancelled" | "done" | ""; // sesuaikan dengan status yang valid di sistem
  date_inputed: string | null;
  due_date: string | null;
  status: string;
  is_repaid: boolean;
  note: string;
  company_id: string;
  label: string;
}
interface IJournalEntryCreate {
  transaction_id: string;
  invoice: string;
  description: string;
  transaction_category_id: string;
  amount: number;
  partner: string;
  transaction_type: "payin" | "payout"; // bisa disesuaikan kalau ada lebih dari dua tipe
  status: "paid" | "unpaid" | "completed" | "cancelled" | "done" | ""; // sesuaikan dengan status yang valid di sistem
  date_inputed: string | null;
  due_date: string | null;
  repayment_date: string | null;
  installment: number;
  note: string;
  is_repaid: boolean;
  company_id: string;
}
interface IJournalEntryUpdate {
  id: string;
  transaction_id: string;
  invoice: string;
  description: string;
  transaction_category_id: string;
  amount: number;
  partner: string;
  transaction_type: "payin" | "payout"; // bisa disesuaikan kalau ada lebih dari dua tipe
  status: "paid" | "unpaid" | "completed" | "cancelled" | "done" | ""; // sesuaikan dengan status yang valid di sistem
  date_inputed: string | null;
  due_date: string | null;
  repayment_date: string | null;
  installment: number;
  note: string;
  is_repaid: boolean;
  company_id: string;
}

interface IJournalEntryData {
  journalEntryList: IJournalEntryItem[];
  page: number;
  limit: number;
  total: number;
}

interface IJournalEntryResponse {
  data: IJournalEntryData;
  message: string;
  status: string;
}
