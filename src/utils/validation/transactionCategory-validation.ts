import * as yup from "yup";

export const validationSchemaTransactionCategory = yup.object().shape({
  name: yup.string().required("Nama wajib diisi"),
  status: yup.string().required("Status harus diisi"),

  transaction_label: yup.string().required("Label transaksi harus diisi"),

  debit_account_id: yup.string().required("Akun debit wajib diisi"),
  credit_account_id: yup.string().required("Akun kredit wajib diisi"),
  transaction_type: yup.string().required("Tipe Transaksi wajib diisi"),
  category: yup.string().required("Kategori wajib diisi"),
  description: yup.string().required("Deskripsi harus diisi"),
});
