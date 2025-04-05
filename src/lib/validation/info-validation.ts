import { validationSchemaInfo } from "../initialValues/initialValuesInfo";

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
