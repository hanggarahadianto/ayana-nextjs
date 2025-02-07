interface IGoods {
  id: string; // UUID
  good_name: string;
  status: string;
  unit: string;

  price: number;
  quantity: number;
  costs_due: number;
  total_cost: number;
  good_purchase_date?: string; // ISO date string
  good_settlement_date?: string; // ISO date string
}
interface IGoodCreate {
  good_name: string;
  status: string;
  unit: string;
  price: number;
  costs_due: number;
  quantity: number;
  total_cost: number;
  good_purchase_date?: string; // ISO date string
  good_settlement_date?: string; // ISO date string
}

interface ICashFlow {
  id: string; // UUID
  week_number: string;
  cash_in: number;
  cash_out: number;
  outstanding: number;
  project_id: string; // UUID
  good?: IGoods[]; // Optional goods array
}

interface ICashFlowCreate {
  week_number: string;
  cash_in: number;
  cash_out: number;
  outstanding: number;
  project_id: string; // UUID
  good?: IGoodCreate[]; // Optional goods array
}

// ICashFlowUpdate.ts
interface ICashFlowUpdate {
  id: string; // UUID
  week_number: string;
  cash_in: number;
  cash_out: number;
  outstanding: number;
  project_id: string; // UUID
  good?: IGoods[]; // Optional goods array
}

interface ICashFlowResponse {
  data: ICashFlow[];
  status: string;
}
