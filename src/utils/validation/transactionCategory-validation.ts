import * as yup from "yup";

export const validationSchemaTransactionCategory = yup.object().shape({
  name: yup.string().required("Nama wajib diisi"),
  status: yup.string().required("Status harus diisi"),

  transaction_label: yup.string().required("Label transaksi harus diisi"),

  debit_account_id: yup.string().required("Akun debit wajib diisi"),
  credit_account_id: yup.string().required("Akun kredit wajib diisi"),
  transaction_type: yup.string().required("Tipe Transaksi wajib diisi"),
  debit_category: yup.string().required("Kategori debit wajib diisi"),
  credit_category: yup.string().required("Kategori kredit wajib diisi"),
  description: yup.string().required("Deskripsi harus diisi"),
});
