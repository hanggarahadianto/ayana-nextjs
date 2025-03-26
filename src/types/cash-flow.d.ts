interface ICashFlow {
  created_at: string | number | Date;
  id: string; // UUID
  week_number: string;
  cash_in: number;
  cash_out: number;
  project_id: string; // UUID
  good?: IGoods[]; // Optional goods array
}

interface ICashFlowCreate {
  week_number: string;
  cash_in: number;
  cash_out: number;

  project_id: string; // UUID
  good?: IGoodCreate[]; // Optional goods array
}

// ICashFlowUpdate.ts
interface ICashFlowUpdate {
  id: string;
  week_number: string;
  cash_in: number;
  cash_out: number;
  good?: IGoodCreate[]; // Optional goods array
}

interface ICashFlowResponse {
  data: ICashFlow[];
  status: string;
}
