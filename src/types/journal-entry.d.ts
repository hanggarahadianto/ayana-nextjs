interface IJournalEntry {
  id: string;
  invoice: string;
  description: string;
  transaction_category_id: string;
  amount: number;
  partner: string;
  transaction_type: "payin" | "payout"; // bisa disesuaikan kalau ada lebih dari dua tipe
  status: "draft" | "completed" | "cancelled"; // sesuaikan dengan status yang valid di sistem
  date_inputed: string; // ISO string (e.g. "2025-04-18T00:00:00Z")
  due_date: string;
  status: string;
  company_id: string;
}
interface IJournalEntryCreate {
  invoice: string;
  description: string;
  transaction_category_id: string;
  amount: number;
  partner: string;
  transaction_type: "payin" | "payout"; // bisa disesuaikan kalau ada lebih dari dua tipe
  status: "draft" | "completed" | "cancelled"; // sesuaikan dengan status yang valid di sistem
  date_inputed: string; // ISO string (e.g. "2025-04-18T00:00:00Z")
  due_date: string;
  status: string;
  company_id: string;
}

interface IJournalEntryResponse {
  data: IJournalEntry[];
  status: string;
  limit?: number; // Optional jika tidak selalu ada
  page?: number; // Optional jika tidak selalu ada
  total?: number; // Optional jika tidak selalu ada
}
