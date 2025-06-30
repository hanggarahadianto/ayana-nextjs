import * as Yup from "yup";

export const validationSchemaEmployee = Yup.object({
  name: Yup.string().required("Nama wajib diisi"),
  address: Yup.string().required("Alamat wajib diisi"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Nomor telepon harus berupa angka")
    .min(10, "Nomor telepon minimal 10 digit")
    .required("Nomor telepon wajib diisi"),
  date_birth: Yup.string()
    .required("Tanggal input wajib diisi")
    .test("is-date", "Format tanggal tidak valid", (val) => !isNaN(Date.parse(val || ""))),

  department: Yup.string().required("Departemen wajib diisi"),
});
