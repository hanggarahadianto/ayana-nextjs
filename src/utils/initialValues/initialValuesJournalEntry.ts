export const initialValuesJournalEntry = (companyId?: string | null, transactionType?: string | null) => {
  const defaultStatus: "paid" | "unpaid" | "completed" | "cancelled" | "done" | "" = "";
  return {
    journalEntries: [
      {
        transaction_id: "",
        invoice: "",
        description: "",
        amount: 0,
        partner: "",
        date_inputed: "",
        due_date: "",
        repayment_date: "",
        installment: 0,
        is_repaid: false,
        note: "",
        status: defaultStatus,
        transaction_type: (transactionType as "payin" | "payout") || "payin",
        transaction_category_id: "",
        company_id: companyId || "",
      },
    ],
  };
};

export const initialValuesJournalEntryUpdate = (
  initialValues?: IJournalEntry,
  companyId?: string | null,
  transactionType?: string | null
) => {
  const defaultStatus: "paid" | "unpaid" | "completed" | "cancelled" | "done" | "" = "";
  return {
    journalEntries: [
      {
        id: initialValues?.id || "",
        transaction_id: initialValues?.transaction_id || "",
        invoice: initialValues?.invoice || "",
        description: initialValues?.description || "",
        amount: initialValues?.amount || 0,
        partner: initialValues?.partner || "",
        date_inputed: initialValues?.date_inputed || "",
        due_date: initialValues?.due_date || "",
        repayment_date: null,
        installment: 0,
        is_repaid: initialValues?.is_repaid || false,
        note: initialValues?.note || "",
        status: initialValues?.status || defaultStatus,
        transaction_type: initialValues?.transaction_type || (transactionType as "payin" | "payout") || "payin",
        transaction_category_id: initialValues?.transaction_category_id || "",
        transaction_category_name: initialValues?.transaction_category_name || "",
        company_id: companyId || initialValues?.company_id || "",
      },
    ],
  };
};
