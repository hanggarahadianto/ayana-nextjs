interface IPayout {
  id: string;
  invoice: string;
  nominal: number;
  date_inputed: string;
  note: string;
  company_id: string;
  company_name: string;
  created_at: string;
  updated_at: string;
}

interface IPayoutCreate {
  invoice: string;
  nominal: number;
  date_inputed: string;
  note: string;
  company_id: string;
}
interface IPayoutUpdate {
  id: string;
  invoice: string;
  nominal: number;
  date_inputed: string;
  note: string;
  company_id: string;
}

interface IPayoutResponse {
  data: IPayout[];
  status: string;
  limit?: number; // Optional jika tidak selalu ada
  page?: number; // Optional jika tidak selalu ada
  total?: number; // Optional jika tidak selalu ada
}
