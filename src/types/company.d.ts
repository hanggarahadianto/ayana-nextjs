interface ICompany {
  id: string;
  title: string;
  company_code: string;
  color: string;
  has_customer: boolean; // Ubah dari string ke boolean
  has_project: boolean; // Ubah dari string ke boolean
  has_product: boolean; // Ubah dari string ke boolean
  is_retail: boolean;
}

interface ICompanyResponse {
  data: ICompany[];
  status: string;
}
