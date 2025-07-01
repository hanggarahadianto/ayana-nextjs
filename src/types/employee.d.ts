interface IEmployeeItem {
  id: string; // UUID
  name: string;
  address: string;
  gender: string;
  date_birth: string;
  religion: string; // Optional field for religion
  marital_status?: string; // Optional field for marital status
  phone: string;
  department: string;
  position: string;
  employee_education?: string; // Optional field for education
  employee_contract_type?: string; // Optional field for contract typ
  employee_status: string; // Status karyawan, misalnya "active", "inactive", dll.
  company_id: string;
  created_at: string; // ISO string dari Date
  updated_at: string; // ISO string dari Date
}

interface IEmployeeCreate {
  name: string;
  address: string;
  gender: string;
  date_birth: string;
  religion: string; // Optional field for religion
  marital_status?: string; // Optional field for marital status
  phone: string;
  department: string;
  employee_education?: string; // Optional field for education
  employee_contract_type?: string; // Optional field for contract type
  position: string;
  employee_status: string; // Status karyawan, misalnya "active", "inactive", dll.
  company_id: string;
}
interface IEmployeeUpdate {
  id: string;
  name: string;
  gender: string;
  address: string;
  religion: string; // Optional field for religion
  marital_status?: string; // Optional field for marital status
  date_birth: string;
  employee_education?: string; // Optional field for education
  employee_contract_type?: string; // Optional field for contract type
  phone: string;
  department: string;
  position: string;
  employee_status: string; // Status karyawan, misalnya "active", "inactive", dll.
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
