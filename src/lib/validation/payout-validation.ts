import * as Yup from "yup";

export const validationSchemaPayout = Yup.object({
  invoice: Yup.string().required("Invoice harus diisi"),
  nominal: Yup.number().required("Nominal harus diisi").moreThan(0, "Nominal harus lebih besar dari 0"),
  note: Yup.string().required("Catatan harus diisi"),
  status: Yup.string().required("Status harus diisi"),
});

export const validationSchemaPayDebt = Yup.object({
  invoice: Yup.string().required("Invoice harus diisi"),
  payment_date: Yup.string().required("Tanggal pelunasan harus diisi"),
});
