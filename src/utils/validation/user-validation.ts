import * as yup from "yup";

export const userValidationSchemaCreate = yup.object({
  username: yup.string().required("Username wajib diisi").min(3, "Username minimal 3 karakter").max(50, "Username maksimal 50 karakter"),
  password: yup.string().required("Username wajib diisi").min(3, "Password minimal 3 karakter").max(50, "Password maksimal 50 karakter"),

  password_confirm: yup
    .string()
    .required("Password Confirm wajib diisi")
    .min(3, "Password Confirm minimal 3 karakter")
    .max(50, "Password Confirm maksimal 50 karakter"),
});
export const userValidationSchemaUpdate = yup.object({
  username: yup
    .string()
    .required("Username wajib diisi")
    .min(3, "Username minimal 3 karakter")
    .max(50, "Username maksimal 50 karakter")
    .nullable(), // biar boleh null

  // password: yup.string().required("Username wajib diisi").min(3, "Password minimal 3 karakter").max(50, "Password maksimal 50 karakter"),

  // password_confirm: yup
  //   .string()
  //   .required("Password Confirm wajib diisi")
  //   .min(3, "Password Confirm minimal 3 karakter")
  //   .max(50, "Password Confirm maksimal 50 karakter"),
});
