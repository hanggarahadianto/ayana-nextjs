import { employeeTypeOptions } from "@/constants/dictionary";
import { m } from "framer-motion";
import * as Yup from "yup";

export const validationSchemaEmployee = Yup.object({
  name: Yup.string().required("Nama wajib diisi"),
  address: Yup.string().required("Alamat wajib diisi"),
  gender: Yup.string().required("Jenis kelamin wajib diisi"),
  religion: Yup.string().required("Agama wajib diisi"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Nomor telepon harus berupa angka")
    .min(10, "Nomor telepon minimal 10 digit")
    .required("Nomor telepon wajib diisi"),
  date_birth: Yup.string()
    .required("Tanggal input wajib diisi")
    .test("is-date", "Format tanggal tidak valid", (val) => !isNaN(Date.parse(val || ""))),

  employee_education: Yup.string().required("Pendidikan terakhir wajib diisi"),
  marital_status: Yup.string().required("Status pernikahan wajib diisi"),
  department: Yup.string().required("Departemen wajib diisi"),
  position: Yup.string().required("Posisi wajib diisi"),
  // employee_contract_type: Yup.string()
  //   .oneOf(
  //     employeeTypeOptions.map((option) => option.value),
  //     "Jenis karyawan tidak valid"
  //   )
  //   .required("Jenis karyawan wajib diisi"),
  employee_contract_type: Yup.string().oneOf(["-", ...employeeTypeOptions.map((option) => option.value)], "Jenis karyawan tidak valid"),
  employee_status: Yup.string().required("Status karyawan wajib diisi"),
});
