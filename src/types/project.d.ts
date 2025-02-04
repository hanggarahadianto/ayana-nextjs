interface IProject {
  id: string;
  project_name: string;
  project_leader: string;
  project_time: string;
  total_cost: number;
  project_start: string;
  project_end: string;
  type: string;
  note: string;
  created_at: string;
  updated_at: string;
}

interface IProjectCreate {
  project_name: string;
  location: string;
  project_leader: string;
  unit: string;
  project_time: string;
  total_cost: number;
  project_start: string;
  project_end: string;
  type: string;
  note: string;
}
interface IProjectUpdate {
  id: string;
  project_name: string;
  project_leader: string;
  project_time: string;
  total_cost: number;
  project_start: string;
  project_end: string;
  type: string;
  note: string;
}

interface IProjectResponse {
  data: IProject[];
  status: string;
}
