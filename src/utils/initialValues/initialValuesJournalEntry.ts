// export const initialValuesJournalEntry = (companyId?: string | null, transactionType?: string | null): IJournalEntryCreate => ({
//   invoice: "",
//   description: "",
//   transaction_category_id: "",
//   amount: 0,
//   partner: "",
//   transaction_type: (transactionType as "payin" | "payout") || "",
//   status: "paid",
//   installment: 0,
//   is_repaid: true,
//   date_inputed: "",
//   due_date: "",
//   note: "",

//   company_id: companyId || "",
// });

export const initialValuesJournalEntry = (companyId?: string | null, transactionType?: string | null): IJournalEntryCreate => {
  const isPayin = transactionType === "payin";

  return {
    invoice: "",
    description: "",
    transaction_category_id: "",
    amount: 0,
    partner: "",
    transaction_type: (transactionType as "payin" | "payout") || "",
    status: isPayin ? "unpaid" : "paid",
    installment: 0,
    is_repaid: !isPayin, // false if payin, true otherwise
    date_inputed: "",
    due_date: "",
    note: "",
    company_id: companyId || "",
  };
};
