import * as Yup from "yup";

export const validationSchemaCustomer = Yup.object({
  name: Yup.string().required("Nama wajib diisi"),
  address: Yup.string().required("Alamat wajib diisi"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Nomor telepon harus berupa angka")
    .min(10, "Nomor telepon minimal 10 digit")
    .required("Nomor telepon wajib diisi"),

  // Sesuai dengan value dari houseSaleStatuses
  status: Yup.string()
    .oneOf(
      [
        "booking",
        "bank_processing",
        "approved_by_bank",
        "rejected_by_bank",
        "credit_agreement",
        "under_construction",
        "construction_completed",
        "handover",
        "canceled",
      ],
      "Status tidak valid"
    )
    .required("Status wajib dipilih"),

  // Payment methods
  payment_method: Yup.string()
    .oneOf(["cash", "cash_installment", "kpr", "kpr_subsidized", "construction_progress", "inhouse"], "Metode pembayaran tidak valid")
    .required("Metode pembayaran wajib dipilih"),
  amount: Yup.number()
    .typeError("Jumlah harus berupa angka")
    .moreThan(0, "Jumlah harus lebih dari 0")
    .required("Jumlah pembayaran wajib diisi"),

  date_inputed: Yup.string()
    .required("Tanggal input wajib diisi")
    .test("is-date", "Format tanggal tidak valid", (val) => !isNaN(Date.parse(val || ""))),

  marketer_id: Yup.string().required("Nama marketer wajib diisi"),

  home_id: Yup.string().required("Produk wajib diisi"),
  product_unit: Yup.string().required("Unit wajib diisi"),
});
