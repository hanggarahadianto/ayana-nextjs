interface IEmployeeItem {
  id: string; // UUID
  name: string;
  address: string;
  date_birth: string;
  phone: string;
  department: string;
  company_id: string;
  created_at: string; // ISO string dari Date
  updated_at: string; // ISO string dari Date
}

interface IEmployeeCreate {
  name: string;
  address: string;
  date_birth: string;
  phone: string;
  department: string;
  company_id: string;
}
interface IEmployeeUpdate {
  id: string;
  name: string;
  address: string;
  date_birth: string;
  phone: string;
  department: string;
  company_id: string;
}

interface IEmployeeData {
  employeeList: IEmployeeItem[];
  total_employee: number;
  page: number;
  limit: number;
  total: number;
}

interface IEmployeeResponse {
  data: IEmployeeData;
  message: string;
  status: string;
}
