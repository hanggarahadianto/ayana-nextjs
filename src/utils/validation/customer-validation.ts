import * as Yup from "yup";

export const validationSchemaCustomer = Yup.object({
  name: Yup.string().required("Nama wajib diisi"),
  address: Yup.string().required("Alamat wajib diisi"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Nomor telepon harus berupa angka")
    .min(10, "Nomor telepon minimal 10 digit")
    .required("Nomor telepon wajib diisi"),
  status: Yup.string().oneOf(["pending", "deal", "booking", "sold", "progress"], "Status tidak valid").required("Status wajib dipilih"),
  marketer: Yup.string().required("Nama marketer wajib diisi"),
  home_id: Yup.string().nullable().notRequired(), // opsional, tergantung kondisi
});
