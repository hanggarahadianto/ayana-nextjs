import * as yup from "yup";

export const validationSchemaJournalEntry = yup.object().shape({
  invoice: yup.string().required("Invoice wajib diisi").max(100, "Invoice maksimal 100 karakter"),

  description: yup.string().required("Deskripsi wajib diisi").max(255, "Deskripsi maksimal 255 karakter"),

  transaction_category_id: yup.string().uuid("ID kategori tidak valid").required("Kategori transaksi wajib dipilih"),

  amount: yup.number().required("Jumlah wajib diisi").min(1, "Jumlah harus lebih dari 0"),

  partner: yup.string().required("Partner wajib diisi").max(255, "Deskripsi maksimal 255 karakter"),

  transaction_type: yup
    .mixed<"payin" | "payout">()
    .oneOf(["payin", "payout"], "Tipe transaksi tidak valid")
    .required("Tipe transaksi wajib diisi"),

  status: yup
    .mixed<"draft" | "unpaid" | "paid" | "completed" | "cancelled">()
    .oneOf(["draft", "unpaid", "paid", "completed", "cancelled"], "Status tidak valid")
    .required("Status wajib diisi"),

  date_inputed: yup
    .string()
    .required("Tanggal input wajib diisi")
    .test("is-date", "Format tanggal tidak valid", (val) => !isNaN(Date.parse(val || ""))),

  // company_id: yup.string().uuid("ID perusahaan tidak valid").required("Perusahaan wajib dipilih"),
});
