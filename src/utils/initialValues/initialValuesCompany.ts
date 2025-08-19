// initialCompanyValues.ts

// Nilai awal untuk membuat company
export const initialCompanyValuesCreate: ICompanyCreate = {
  title: "",
  company_code: "",
  color: "",
  has_customer: false,
  has_project: false, // Ubah dari string ke boolean
  has_product: false, // Ubah dari string ke boolean
  is_retail: false,
};

export const initialCompanyValuesUpdate = (initialValues?: Partial<ICompanyUpdate>): ICompanyUpdate => ({
  id: initialValues?.id ?? "",
  title: initialValues?.title ?? "",
  company_code: initialValues?.company_code ?? "",
  color: initialValues?.color ?? "",
  has_customer: initialValues?.has_customer ?? false,
  has_project: initialValues?.has_project ?? false,
  has_product: initialValues?.has_product ?? false,
  is_retail: initialValues?.is_retail ?? false,
});
