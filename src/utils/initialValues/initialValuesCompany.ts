// initialCompanyValues.ts

// Nilai awal untuk membuat company
export const initialCompanyValues: ICompanyCreate = {
  title: "",
  company_code: "",
  color: "",
  has_customer: false,
  has_project: false, // Ubah dari string ke boolean
  has_product: false, // Ubah dari string ke boolean
  is_retail: false,
};

// Fungsi untuk menghasilkan nilai awal ketika update company
// export const getInitialCompanyValues = (initialValues?: ICompanyUpdate): ICompanyUpdate => ({
//   id: initialValues?.id ?? "",
//   name: initialValues?.name ?? "",
//   address: initialValues?.address ?? "",
//   phone: initialValues?.phone ?? "",
//   email: initialValues?.email ?? "",
//   npwp: initialValues?.npwp ?? "",
// });
