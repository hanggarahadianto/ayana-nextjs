import * as Yup from "yup";

export const validationSchemaAccount = Yup.object().shape({
  code: Yup.string()
    .required("Kode akun wajib diisi")
    .matches(/^[0-9]+$/, "Kode akun harus berupa angka"),
  name: Yup.string().required("Nama akun wajib diisi"),
  type: Yup.string().required("Tipe akun wajib dipilih"),
  category: Yup.string().required("Kategori harus diisi"),
  description: Yup.string().required("Deskripsi harus disii"),
});
