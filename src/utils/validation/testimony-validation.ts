import * as Yup from "yup";

export const validationSchemaTestimony = Yup.object({
  rating: Yup.number()
    .typeError("Rating harus berupa angka")
    .required("Rating wajib diisi")
    .min(1, "Rating minimal 1")
    .max(5, "Rating maksimal 5"),

  note: Yup.string().required("Catatan wajib diisi").max(500, "Catatan maksimal 500 karakter"),

  customer_id: Yup.string().nullable(),
});
