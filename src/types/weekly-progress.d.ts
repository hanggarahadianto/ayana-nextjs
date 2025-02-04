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
  week_number: string;
  percentage: string;
  amount_worker: number;
  amount_material: number;
  project_id: string;
  material: IMaterialCreate[];
  worker: IWorkerCreate[];
}

interface IWeeklyProgressUpdate {
  id: string;
  week_number: string;
  percentage: string;
  amount_worker: number;
  amount_material: number;
  project_id: string;
  material: IMaterialCreate[];
  worker: IWorkerCreate[];
}

interface IWeeklyProgressResponse {
  data: IWeeklyProgress[];
  status: string;
}
