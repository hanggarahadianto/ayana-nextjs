interface ICompanyItem {
  id: string;
  title: string;
  company_code: string;
  color: string;
  has_customer: boolean;
  has_project: boolean;
  has_product: boolean;
  is_retail: boolean;
  created_at?: string;
  updated_at?: string;
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
  page?: number;
  limit?: number;
  total_data?: number;
  total_page?: number;
}

interface ICompanyResponse {
  data: ICompanyData;
  message: string;
  status: string;
}
