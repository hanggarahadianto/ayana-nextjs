export const initialValuesJournalEntry = (companyId: string | null, transactionType: string | null): IJournalEntryCreate => ({
  invoice: "",
  description: "",
  transaction_category_id: "",
  amount: 0,
  partner: "",
  transaction_type: (transactionType as "payin" | "payout") || "",
  status: "unpaid",
  installment: 0,
  is_repaid: false,
  date_inputed: "",
  due_date: "",

  company_id: companyId || "",
});
