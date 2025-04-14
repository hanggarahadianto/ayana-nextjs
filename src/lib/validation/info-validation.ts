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

export const validateInfos = async (values: any, field?: string, setErrorsInfo?: (errors: any) => void): Promise<void> => {
  try {
    if (field) {
      await validationSchemaInfo.validateAt(field, values);
      setErrorsInfo?.((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } else {
      await validationSchemaInfo.validate(values, { abortEarly: false });
      if (setErrorsInfo) setErrorsInfo({});
    }
  } catch (err: any) {
    if (err.inner && Array.isArray(err.inner) && setErrorsInfo) {
      const formErrors: { [key: string]: string } = {};
      err.inner.forEach((validationError: any) => {
        if (validationError.path) {
          formErrors[validationError.path] = validationError.message;
        }
      });
      setErrorsInfo(formErrors);
    }
  }
};
