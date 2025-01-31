interface IMaterial {
  material_name: string;
  quantity: number;
  total_cost: number;
}

interface IWorker {
  worker_name: string;
  position: string;
}

interface IWeeklyProgress {
  id: string;
  week_number: string;
  percentage: string;
  amount_worker: number;
  amount_material: number;
  project_id: string;
  material: IMaterial[];
  worker: IWorker[];
  created_at: string;
  updated_at: string;
}

interface IWeeklyProgressCreate {
  // id: string;
  week_number: string;
  percentage: string;
  amount_worker: number;
  amount_material: number;
  project_id: string;
  material: IMaterial[];
  worker: IWorker[];
}

interface IWeeklyProgressUpdate {
  id: string;
  week_number: string;
  percentage: string;
  amount_worker: number;
  amount_material: number;
  project_id: string;
  material: IMaterial[];
  worker: IWorker[];
}

interface IWeeklyProgressResponse {
  data: IWeeklyProgress[];
  status: string;
}
