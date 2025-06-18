interface ICustomerItem {
  id: string; // UUID
  name: string;
  address: string;
  phone: string;
  status: string; // contoh: "pending", "deal", dsb
  marketer: string;
  payment_method: string;
  amount: number;
  date_inputed: string;
  home_id?: string | null; // UUID atau null
  home?: IProduct | null; // Optional relasi
  product_unit: string | null;
  bank_name: string;
  company_id: string;
  created_at: string; // ISO string dari Date
  updated_at: string; // ISO string dari Date
}

interface ICustomerCreate {
  name: string;
  address: string;
  phone: string;
  status: string; // contoh: "pending", "deal", dsb
  payment_method: string;
  amount: number;
  date_inputed: string;
  marketer: string;
  home_id?: string | null; // UUID atau null
  product_unit: string | null;
  bank_name: string;
  company_id: string;
}
interface ICustomerUpdate {
  id: string;
  name: string;
  address: string;
  phone: string;
  status: string; // contoh: "pending", "deal", dsb
  payment_method: string;
  amount: number;
  date_inputed: string;
  marketer: string;
  home_id?: string | null; // UUID atau null
  product_unit: string | null;
  bank_name: string;
  company_id: string;
}

interface ICustomerData {
  customerList: ICustomerItem[];
  total_customer: number;
  page: number;
  limit: number;
  total: number;
}

interface ICustomerResponse {
  data: ICustomerData;
  message: string;
  status: string;
}
