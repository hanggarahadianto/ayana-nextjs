export const initialValuesJournalEntry = (companyId?: string | null, transactionType?: string | null, selectedDeb?: IDebtSummaryItem) => {
  const defaultStatus = transactionType === "payin" ? "unpaid" : null;

  return {
    journalEntries: [
      {
        transaction_id: "",
        invoice: "",
        description: "",
        amount: 0,
        partner: selectedDeb?.partner,
        date_inputed: "", // Tanggal input (kosongkan jika tidak ada)
        due_date: "",
        installment: 0,
        is_repaid: false,
        note: "",
        status: "", // Status diatur berdasarkan transaksi
        // status: defaultStatus, // Status diatur berdasarkan transaksi
        transaction_type: (transactionType as "payin" | "payout") || "",
        transaction_category_id: "",
        company_id: companyId || "", // Gunakan companyId jika ada, jika tidak gunakan default
      },
    ],
  };
};
