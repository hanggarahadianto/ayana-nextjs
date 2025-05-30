export const initialValuesReservedJournalEntry = (
  companyId?: string | null,
  transactionType?: string | null,
  initialData: IJournalEntryUpdate | null = null
): { journalEntries: IJournalEntryCreate[] } => {
  const defaultStatus: "paid" | "unpaid" | "completed" | "cancelled" | "done" = "unpaid";

  return {
    journalEntries: [
      {
        transaction_id: initialData?.transaction_id ?? "",
        invoice: initialData?.invoice ?? "",
        description: initialData?.description ?? "",
        transaction_category_id: "",
        amount: initialData?.amount ?? 0,
        partner: initialData?.partner ?? "",
        transaction_type: (transactionType as "payin" | "payout") || "",
        status: "done",
        is_repaid: true,
        date_inputed: "", // sesuai definisi: string | null
        due_date: initialData?.due_date ?? null, // sesuai definisi: string | null
        installment: initialData?.installment ?? 0,
        note: initialData?.note ?? "",
        company_id: initialData?.company_id ?? companyId ?? "",
      },
    ],
  };
};
