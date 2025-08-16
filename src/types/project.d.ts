interface IProjectItem {
  id: string;
  project_name: string;
  location: string;
  type: string;
  unit: string;
  project_leader: string;
  project_time: string;
  total_cost: number;
  project_start: Date | null;
  investor: string;
  project_end: Date | null;
  note: string;
  project_status: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}

interface IProjectCreate {
  location: string;
  unit: string;
  type: string;
  investor: string;
  project_leader: string;
  project_time: string;
  total_cost: number;
  project_start: string;
  project_end: string;
  type: string;
  note: string;
  project_status: string;
  company_id: string;
}
interface IProjectUpdate {
  id: string;
  location: string;
  type: string;
  unit: string;
  project_leader: string;
  investor: string;
  project_time: string;
  total_cost: number;
  project_start: Date | null;
  project_end: Date | null;
  project_status: string;
  note: string;
  company_id: string;
  created_at?: string;
  updated_at?: string;
}

interface IProjectData {
  projectList: IProjectItem[];
  total_project: number;
  page: number;
  limit: number;
  total: number;
}

interface IProjectResponse {
  data: IProjectData;
  message: string;
  status: string;
}
