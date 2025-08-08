// types/company.d.ts

interface ICompanyItem {
  id: string;
  title: string;
  company_code: string;
  color: string;
  has_customer: boolean;
  has_project: boolean;
  has_product: boolean;
  is_retail: boolean;
  created_at?: string; // optional kalau dari BE
  updated_at?: string; // optional kalau dari BE
}

interface ICompanyCreate {
  title: string;
  company_code: string;
  color: string;
  has_customer: boolean;
  has_project: boolean;
  has_product: boolean;
  is_retail: boolean;
}

interface ICompanyUpdate extends ICompanyCreate {
  id: string;
}

interface ICompanyData {
  companyList: ICompanyItem[];
  status: string;
  page?: number; // dari BE kalau pakai pagination
  limit?: number; // dari BE kalau pakai pagination
  total_data?: number; // total seluruh data
  total_page?: number; // total halaman
}

interface ICompanyResponse {
  data: ICompanyData;
  message: string;
  status: string;
}
