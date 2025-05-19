interface ICustomer {
  id: string; // UUID
  name: string;
  address: string;
  phone: string;
  status: string; // contoh: "pending", "deal", dsb
  marketer: string;
  home_id?: string | null; // UUID atau null
  created_at: string; // ISO string dari Date
  updated_at: string; // ISO string dari Date
  home?: IProduct | null; // Optional relasi
}
interface ICustomerCreate {
  name: string;
  address: string;
  phone: string;
  status: string; // contoh: "pending", "deal", dsb
  marketer: string;
  home_id?: string | null; // UUID atau null
}

interface ICustomerResponse {
  data: ICustomer[];
  status: string;
  limit?: number; // Optional jika tidak selalu ada
  page?: number; // Optional jika tidak selalu ada
  total?: number; // Optional jika tidak selalu ada
}
