interface IPayout {
  id: string;
  invoice: string;
  nominal: number;
  date_inputed: string;
  due_date: string;
  payment_date: string;
  note: string;
  company_id: string;
  company_name: string;
  status: string;
  category: string;
  mitra: string;
  created_at: string;
  updated_at: string;
}

interface IPayoutCreate {
  invoice: string;
  nominal: number;
  date_inputed: string;
  due_date: string;
  payment_date: string;
  note: string;
  category: string;
  mitra: string;
  company_id: string;
  status: string;
}
interface IPayoutUpdate {
  id: string;
  invoice: string;
  nominal: number;
  date_inputed: string;
  due_date: string;
  payment_date?: string | null;
  note: string;
  category: string;
  mitra: string;
  company_id: string;
  status: string;
}
interface IPayDebtUpdate {
  id: string;
  invoice: string;
  payment_date?: string | null;
  company_id: string;
  status: string;
}

interface IPayoutResponse {
  data: IPayout[];
  status: string;
  limit?: number; // Optional jika tidak selalu ada
  page?: number; // Optional jika tidak selalu ada
  total?: number; // Optional jika tidak selalu ada
}
