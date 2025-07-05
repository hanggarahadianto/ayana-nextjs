import * as Yup from "yup";

export const validationSchemaAgent = Yup.object({
  name: Yup.string().required("Nama wajib diisi"),
  address: Yup.string().required("Alamat wajib diisi"),
  gender: Yup.string().required("Jenis kelamin wajib diisi"),
  religion: Yup.string().required("Agama wajib diisi"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Nomor telepon harus berupa angka")
    .min(10, "Nomor telepon minimal 10 digit")
    .required("Nomor telepon wajib diisi"),
});
