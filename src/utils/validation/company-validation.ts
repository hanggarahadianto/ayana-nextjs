import * as Yup from "yup";

export const companyValidationSchema = Yup.object().shape({
  title: Yup.string().required("Nama perusahaan wajib diisi").max(100, "Maksimal 100 karakter"),

  company_code: Yup.string().required("Kode perusahaan wajib diisi").max(5, "Maksimal 5 karakter"),

  has_customer: Yup.boolean().required(),
  has_project: Yup.boolean().required(),
  has_product: Yup.boolean().required(),
  is_retail: Yup.boolean().required(),
});
