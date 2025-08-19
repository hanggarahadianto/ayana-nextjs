interface ICompanyUser {
  id: string; // id relasi user-company
  user_id: string; // id user asli
  username: string; // nama user
  role: string; // role di perusahaan (misal: admin, staff)
}

interface ICompanyItem {
  id: string;
  title: string;
  company_code: string;
  color: string;
  has_customer: boolean;
  has_project: boolean;
  has_product: boolean;
  is_retail: boolean;
  users: ICompanyUser[]; // array user di perusahaan
  created_at?: string;
  updated_at?: string;
}

interface ICompanyCreate {
  title: string;
  company_code: string;
  color: string;
  has_product: boolean;
  has_customer: boolean;
  has_project: boolean;
  is_retail: boolean;
}

interface ICompanyUpdate extends ICompanyCreate {
  id: string;
}

interface ICompanyData {
  companyList: ICompanyItem[];
  status: string;
  page?: number;
  limit?: number;
  total_company?: number;
  total_page?: number;
}

interface ICompanyResponse {
  data: ICompanyData;
  message: string;
  status: string;
}

interface IAssignUserToCompany {
  company_id: string; // ID perusahaan yang dipilih
  user_ids: string[]; // List ID user yang akan handle
}
