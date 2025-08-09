import * as yup from "yup";

export const userValidationSchema = yup.object({
  username: yup
    .string()
    .required("Username wajib diisi")
    .min(3, "Username minimal 3 karakter")
    .max(50, "Username maksimal 50 karakter")
    .nullable(), // biar boleh null
  customer: yup.string().oneOf(["Option1", "Option2"], "Customer tidak valid").nullable(),
});
