import * as Yup from "yup";

export const initialValuesUser = {
  username: "",
  password: "",
};

export const validationSchemaUser = Yup.object({
  username: Yup.string().required("Username harus diisi").min(3, "Username must be at least 3 characters"),
  password: Yup.string().required("Password harus diisi").min(6, "Password must be at least 6 characters"),
});
