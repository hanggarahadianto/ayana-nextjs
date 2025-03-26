interface IGoods {
  id: string;
  good_name: string;
  status: string;
  quantity: number;
  costs_due: number;
  price: number;
  unit: string;
  total_cost: number;
  cash_flow_id: string;
  created_at: string;
  updated_at: string;
}

interface IGoodsCreate {
  good_name: string;
  status: string;
  quantity: number;
  costs_due: number;
  price: number;
  unit: string;
  total_cost: number;
  cash_flow_id: string;
}

interface IGoodsUpdate {
  id: string;
  good_name: string;
  status: string;
  quantity: number;
  costs_due: number;
  price: number;
  unit: string;
  total_cost: number;
  cash_flow_id: string;
}

interface IGoodsResponse {
  data: IGood[];
  status: string;
  limit?: number; // Optional jika tidak selalu ada
  page?: number; // Optional jika tidak selalu ada
  total?: number; // Optional jika tidak selalu ada
}
