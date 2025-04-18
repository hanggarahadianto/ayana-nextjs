import * as yup from "yup";

export const validationSchemaTransactionCategory = yup.object().shape({
  name: yup.string().required("Nama wajib diisi"),
  debit_account_id: yup.string().required("Akun debit wajib diisi"),
  credit_account_id: yup.string().required("Akun kredit wajib diisi"),
  category: yup.string().required("Kategori wajib diisi"),
  description: yup.string().nullable(),
});
