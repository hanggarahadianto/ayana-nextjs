interface IInvestment {
  id: string;
  nominal: number;
  date_inputed: string; // tanggal mulai investasi
  due_date: string; // jatuh tempo investasi
  investor_name: string;
  total: number; // total akhir (nominal + profit)
  investment_profit: number; // hasil dari bagi hasil
  percentage_profit: number; // persen keuntungan per bulan
  note: string;
  created_at: string;
  updated_at: string;
}

interface IInvestmentCreate {
  nominal: number;
  date_inputed: string;
  due_date: string;
  investor_name: string;
  percentage_profit: number;
  investment_profit: number;
  note: string;
}

interface IInvestmentUpdate {
  id: string;
  nominal: number;
  date_inputed: string;
  due_date: string;
  investor_name: string;
  percentage_profit: number;
  investment_profit: number;
  note: string;
}

interface IInvestmentResponse {
  data: IInvestment[];
  status: string;
  limit?: number;
  page?: number;
  total?: number;
}
