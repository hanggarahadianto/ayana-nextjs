interface IJournalEntry {
  id: string;
  invoice: string;
  description: string;
  transaction_category_id: string;
  amount: number;
  partner: string;
  transaction_type: "payin" | "payout"; // bisa disesuaikan kalau ada lebih dari dua tipe
  status: "draft" | "paid" | "unpaid" | "completed" | "cancelled"; // sesuaikan dengan status yang valid di sistem

  date_inputed: string | null;
  due_date: string | null;
  installment: 0;
  status: string;
  is_repaid: boolean;
  note: string;
  company_id: string;
}
interface IJournalEntryCreate {
  invoice: string;
  description: string;
  transaction_category_id: string;
  amount: number;
  partner: string;
  transaction_type: "payin" | "payout"; // bisa disesuaikan kalau ada lebih dari dua tipe
  status: "draft" | "paid" | "unpaid" | "completed" | "cancelled"; // sesuaikan dengan status yang valid di sistem
  date_inputed: string | null;
  due_date: string | null;
  installment: 0;
  status: string;
  note: string;
  is_repaid: boolean;
  company_id: string;
}

interface IJournalEntryResponse {
  data: IJournalEntry[];
  status: string;
  limit?: number; // Optional jika tidak selalu ada
  page?: number; // Optional jika tidak selalu ada
  total?: number; // Optional jika tidak selalu ada
}
