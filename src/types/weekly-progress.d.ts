interface IMaterial {
  id: string;
  material_name: string;
  quantity: number;
  total_cost: number;
  weekly_progress_id: string;
  created_at: string;
  updated_at: string;
}

interface IWorker {
  id: string;
  worker_name: string;
  position: string;
  weekly_progress_id: string;
  created_at: string;
  updated_at: string;
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

interface IWeeklyProgressResponse {
  data: IWeeklyProgress[];
  status: string;
}
