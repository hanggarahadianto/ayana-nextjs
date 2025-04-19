export const initialValuesJournalEntry = (companyId: string | null, transactionType: string | null): IJournalEntryCreate => ({
  invoice: "",
  description: "",
  transaction_category_id: "",
  amount: 0,
  partner: "",
  transaction_type: (transactionType as "payin" | "payout") || "",
  status: "draft",
  date_inputed: "",
  company_id: companyId || "",
});
