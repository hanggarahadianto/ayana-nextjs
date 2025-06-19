interface IProjectItem {
  id: string;
  project_name: string;
  project_leader: string;
  project_time: string;
  total_cost: number;
  project_start: string;
  investor: string;
  project_end: string;
  type: string;
  note: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}

interface IProjectCreate {
  project_name: string;
  location: string;
  project_leader: string;
  investor: string;
  unit: string;
  project_time: string;
  total_cost: number;
  project_start: string;
  project_end: string;
  type: string;
  note: string;
  company_id: string;
}
interface IProjectUpdate {
  id: string;
  project_name: string;
  project_leader: string;
  investor: string;
  project_time: string;
  total_cost: number;
  project_start: string | Date | null; // Allow null values
  project_end: string | Date | null; // Allow null values
  type: string;
  note: string;
  company_id: string;
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
