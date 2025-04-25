import { ValidCategories } from "@/constants/dictionary";
import * as Yup from "yup";

export const validationSchemaAccount = Yup.object().shape({
  code: Yup.string()
    .required("Kode akun wajib diisi")
    .matches(/^[0-9]+$/, "Kode akun harus berupa angka"),
  name: Yup.string().required("Nama akun wajib diisi"),
  type: Yup.string().required("Tipe akun wajib dipilih"),
  category: Yup.string()
    .required("Kategori harus diisi")
    .test("is-valid-category", "Kategori tidak sesuai dengan tipe akun", function (value) {
      const { type } = this.parent;
      if (!type || !value) return false;
      return validateAccount(type, value);
    }),
  description: Yup.string().required("Deskripsi harus disii"),
});

export const validateAccount = (type: string, category: string): boolean => {
  const categories = ValidCategories[type];
  if (!categories) return false;
  return categories.includes(category);
};
