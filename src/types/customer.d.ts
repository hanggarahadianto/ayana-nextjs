interface ICustomer {
  id: string; // UUID
  name: string;
  address: string;
  phone: string;
  status: string; // contoh: "pending", "deal", dsb
  marketer: string;
  home_id?: string | null; // UUID atau null
  payment_method: string;
  amount: number;
  date_inputed: string;
  created_at: string; // ISO string dari Date
  updated_at: string; // ISO string dari Date
  home?: IProduct | null; // Optional relasi
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
}

interface ICustomerUpdate {
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
}

interface ICustomerResponse {
  data: ICustomer[];
  status: string;
  limit?: number; // Optional jika tidak selalu ada
  page?: number; // Optional jika tidak selalu ada
  total?: number; // Optional jika tidak selalu ada
}
