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

// export const initialValuesJournalEntry = (companyId?: string | null, transactionType?: string | null): IJournalEntryCreate => {
//   const isPayin = transactionType === "payin";

//   return {
//     invoice: "",
//     description: "",
//     transaction_category_id: "",
//     amount: 0,
//     partner: "",
//     transaction_type: (transactionType as "payin" | "payout") || "",
//     status: isPayin ? "unpaid" : "paid",
//     installment: 0,
//     is_repaid: !isPayin, // false if payin, true otherwise
//     date_inputed: "",
//     due_date: "",
//     note: "",
//     company_id: companyId || "",
//   };
// };

export const initialValuesJournalEntry = (companyId?: string | null, transactionType?: string | null) => {
  const defaultStatus = transactionType === "payin" ? "unpaid" : null;

  return {
    journalEntries: [
      {
        transaction_id: "",
        invoice: "",
        description: "",
        amount: 0,
        partner: "",
        date_inputed: "", // Tanggal input (kosongkan jika tidak ada)
        due_date: "",
        installment: 0,
        is_repaid: false,
        note: "",
        status: defaultStatus, // Status diatur berdasarkan transaksi
        transaction_type: (transactionType as "payin" | "payout") || "",
        transaction_category_id: "",
        company_id: companyId || "", // Gunakan companyId jika ada, jika tidak gunakan default
      },
    ],
  };
};
