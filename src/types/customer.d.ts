// MARKETER
interface IMarketer {
  id: string;
  name: string;
  is_agent?: boolean; // opsional kalau tidak selalu tersedia
}

// HOME (alias produk)
interface IProduct {
  id: string;
  cluster_id: string;
  type: string;
  title: string;
  content: string;
  bathroom: number;
  bedroom: number;
  square: number;
  price: number;
  quantity: number;
  status: string;
  sequence: number;
  start_price: number;
}

// CUSTOMER ITEM (untuk list atau detail)
interface ICustomerItem {
  id: string;
  name: string;
  address: string;
  phone: string;
  status: string;

  payment_method: string;
  amount: number;
  date_inputed: string;

  home_id?: string | null;
  home?: IProduct | null;
  marketer?: IMarketer; // ✅ marketer sebagai relasi opsional

  product_unit: string | null;
  bank_name: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}

// FORM: CREATE
interface ICustomerCreate {
  name: string;
  address: string;
  phone: string;
  status: string;
  payment_method: string;
  amount: number;
  date_inputed: string;

  marketer_id: string;

  home_id?: string | null;
  product_unit: string | null;
  bank_name: string;
  company_id: string;
}

// FORM: UPDATE
interface ICustomerUpdate extends ICustomerCreate {
  id: string;
  home_id: string | null; // ✅ wajib didefinisikan secara eksplisit di update
}

interface ICustomerUpdateWithMarketer extends ICustomerUpdate {
  marketer?: IMarketer;
}
// PAGINATED RESPONSE
interface ICustomerData {
  customerList: ICustomerItem[];
  total_customer: number;
  page: number;
  limit: number;
  total: number;
}

// API RESPONSE WRAPPER
interface ICustomerResponse {
  data: ICustomerData;
  message: string;
  status: string;
}
