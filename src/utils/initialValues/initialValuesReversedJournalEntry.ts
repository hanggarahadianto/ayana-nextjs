export const initialValuesReservedJournalEntry = (
  companyId?: string | null,
  transactionType?: string | null,
  selectedDeb?: IDebtSummaryItem
) => {
  const defaultStatus: "draft" | "paid" | "unpaid" | "completed" | "cancelled" | "" = transactionType === "payin" ? "unpaid" : "";

  return {
    journalEntries: [
      {
        transaction_id: "",
        invoice: "",
        description: "",
        amount: 0,
        partner: selectedDeb?.partner || "", // Gunakan partner dari selectedDeb jika ada
        date_inputed: "", // Tanggal input (kosongkan jika tidak ada)
        due_date: selectedDeb?.due_date || "", // Tanggal jatuh tempo dari selectedDeb jika ada
        installment: 0,
        is_repaid: true,
        note: "",
        status: defaultStatus, // Status diatur berdasarkan transaksi
        transaction_type: (transactionType as "payin" | "payout") || "",
        transaction_category_id: "",
        company_id: companyId || "", // Gunakan companyId jika ada, jika tidak gunakan default
      },
    ],
  };
};
