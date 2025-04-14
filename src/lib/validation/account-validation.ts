import * as Yup from "yup";

export const validationSchemaAccount: Yup.ObjectSchema<IAccountCreate> = Yup.object().shape({
  code: Yup.string()
    .required("Kode akun wajib diisi")
    .matches(/^[0-9]+$/, "Kode akun harus berupa angka"),
  name: Yup.string().required("Nama akun wajib diisi"),
  type: Yup.string().required("Tipe akun wajib dipilih"),
  category: Yup.string().required("Kategori akun wajib dipilih"),
  description: Yup.string(),
  company_id: Yup.string().required(),
}) as Yup.ObjectSchema<IAccountCreate>;
