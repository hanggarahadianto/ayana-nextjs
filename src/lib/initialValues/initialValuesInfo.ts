import * as Yup from "yup";

export const validationSchemaInfo = Yup.object().shape({
  maps: Yup.string().required("Link maps wajib diisi"),

  start_price: Yup.number().positive("Price must be a positive number").required("Start price is required"),

  near_by: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Nama tempat wajib diisi"),
      distance: Yup.number().typeError("Jarak hanya boleh angka").required("Jarak wajib diisi"),
    })
  ),
});
