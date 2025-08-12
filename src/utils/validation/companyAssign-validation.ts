// utils/validation/company-validation.ts

import * as Yup from "yup";

export const assignUserValidationSchema = Yup.object().shape({
  company_id: Yup.string().required("Perusahaan wajib dipilih").uuid("ID perusahaan tidak valid"),
  user_ids: Yup.array().of(Yup.string().uuid("ID user tidak valid")).min(1, "Minimal pilih satu user").required("User wajib dipilih"),
});
