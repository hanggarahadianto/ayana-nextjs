// export const validationSchemaJournalEntry = yup.object().shape({
//   invoice: yup.string().required("Invoice wajib diisi").max(100, "Invoice maksimal 100 karakter"),

//   description: yup.string().required("Deskripsi wajib diisi").max(255, "Deskripsi maksimal 255 karakter"),

//   transaction_category_id: yup.string().uuid("ID kategori tidak valid").required("Kategori transaksi wajib dipilih"),

//   amount: yup.number().required("Jumlah wajib diisi").min(1, "Jumlah harus lebih dari 0"),

//   partner: yup.string().required("Partner wajib diisi").max(255, "Deskripsi maksimal 255 karakter"),

//   transaction_type: yup
//     .mixed<"payin" | "payout">()
//     .oneOf(["payin", "payout"], "Tipe transaksi tidak valid")
//     .required("Tipe transaksi wajib diisi"),

//   status: yup
//     .mixed<"draft" | "unpaid" | "paid" | "completed" | "cancelled">()
//     .oneOf(["draft", "unpaid", "paid", "completed", "cancelled"], "Status tidak valid")
//     .required("Status wajib diisi"),

//   date_inputed: yup
//     .string()
//     .required("Tanggal input wajib diisi")
//     .test("is-date", "Format tanggal tidak valid", (val) => !isNaN(Date.parse(val || ""))),

//   due_date: yup.string().when("status", {
//     is: "unpaid",
//     then: (schema) =>
//       schema
//         .required("Jatuh tempo wajib diisi jika status pembayaran adalah tempo")
//         .test("is-date", "Format tanggal tidak valid", (val) => !isNaN(Date.parse(val || ""))),
//     otherwise: (schema) => schema.notRequired(),
//   }),
// });

// export const validationSchemaJournalEntry = (transactionType?: string | null) => {
//   return yup.object().shape({
//     invoice: yup.string().required("Invoice wajib diisi").max(100, "Invoice maksimal 100 karakter"),

//     description: yup.string().required("Deskripsi wajib diisi").max(255, "Deskripsi maksimal 255 karakter"),

//     transaction_category_id: yup.string().uuid("ID kategori tidak valid").required("Kategori transaksi wajib dipilih"),

//     amount: yup.number().required("Jumlah wajib diisi").min(1, "Jumlah harus lebih dari 0"),

//     partner: yup.string().required("Partner wajib diisi").max(255, "Deskripsi maksimal 255 karakter"),

//     transaction_type: yup
//       .mixed<"payin" | "payout">()
//       .oneOf(["payin", "payout"], "Tipe transaksi tidak valid")
//       .required("Tipe transaksi wajib diisi"),

//     status: yup
//       .mixed<"draft" | "unpaid" | "paid" | "completed" | "cancelled">()
//       .oneOf(["draft", "unpaid", "paid", "completed", "cancelled"], "Status tidak valid")
//       .required("Status wajib diisi"),

//     date_inputed: yup
//       .string()
//       .required("Tanggal input wajib diisi")
//       .test("is-date", "Format tanggal tidak valid", (val) => !isNaN(Date.parse(val || ""))),

//     due_date: yup.string().when(["status", "transaction_type"], {
//       is: (status: string, transType: string) => status === "unpaid" && transType !== "payin",
//       then: (schema) =>
//         schema
//           .required("Jatuh tempo wajib diisi jika status pembayaran adalah tempo")
//           .test("is-date", "Format tanggal tidak valid", (val) => !isNaN(Date.parse(val || ""))),
//       otherwise: (schema) => schema.notRequired(),
//     }),
//   });
// };
import * as Yup from "yup";

// Fungsi validasi untuk setiap entry dalam array journalEntries
export const validationSchemaJournalEntry = (transactionType?: string | null) => {
  return Yup.object().shape({
    journalEntries: Yup.array().of(
      Yup.object().shape({
        transaction_id: Yup.string().required("ID transaksi wajib diisi"),
        invoice: Yup.string().required("Invoice wajib diisi").max(100, "Invoice maksimal 100 karakter"),
        description: Yup.string().required("Deskripsi wajib diisi").max(255, "Deskripsi maksimal 255 karakter"),
        transaction_category_id: Yup.string().uuid("ID kategori tidak valid").required("Kategori transaksi wajib dipilih"),
        amount: Yup.number().required("Jumlah wajib diisi").min(1, "Jumlah harus lebih dari 0"),
        partner: Yup.string().required("Partner wajib diisi").max(255, "Partner maksimal 255 karakter"),
        transaction_type: Yup.mixed<"payin" | "payout">()
          .oneOf(["payin", "payout"], "Tipe transaksi tidak valid")
          .required("Tipe transaksi wajib diisi"),
        status: Yup.mixed<"draft" | "unpaid" | "paid" | "completed" | "cancelled">()
          .oneOf(["draft", "unpaid", "paid", "completed", "cancelled"], "Status tidak valid")
          .required("Status wajib diisi"),
        note: Yup.string().required("Keterangan wajib diisi").max(255, "Keterangan maksimal 255 karakter"),

        date_inputed: Yup.string()
          .required("Tanggal input wajib diisi")
          .test("is-date", "Format tanggal tidak valid", (val) => !isNaN(Date.parse(val || ""))),
        due_date: Yup.string().when(["status", "transaction_type", "installment"], {
          is: (status: string, transType: string, installment: number) =>
            status === "unpaid" && transType !== "payin" && (!installment || installment === 0),
          then: (schema) =>
            schema
              .required("Jatuh tempo wajib diisi jika status pembayaran adalah tempo dan tidak ada cicilan")
              .test("is-date", "Format tanggal tidak valid", (val) => !isNaN(Date.parse(val || ""))),
          otherwise: (schema) => schema.notRequired(),
        }),
        installment: Yup.number().nullable(),
      })
    ),
  });
};
