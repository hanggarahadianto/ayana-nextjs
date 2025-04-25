interface ICompany {
  id: string;
  title: string;
  company_code: string;
  color: string;
}

interface ICompanyResponse {
  data: ICompany[];
  status: string;
}
