// interface dasar project (raw dari DB)
interface IProjectBase {
  id: string;
  project_name: string;
  location: string;
  type: string;
  unit: string;
  project_leader: string;
  project_time: string; // target waktu (hari) → masih string di DB
  total_cost: number;
  project_start: Date | null;
  project_end: Date | null;
  project_finished: Date | null;
  investor: string;
  note: string;
  project_status: "ready" | "on progress" | "done" | string;
  company_id: string;
  created_at: string;
  updated_at: string;
}

// interface project setelah di-enrich di BE
interface IProjectItem extends IProjectBase {
  status_text: string; // contoh: "Selesai dalam 31 hari" / "Sedang berjalan ..."
  color: string; // contoh: "green", "red", "gray"
  finish_status?: string; // contoh: "Tepat waktu" / "Terlambat 5 hari"
  is_on_time?: boolean; // true = tepat waktu, false = terlambat
  delay_days?: number;
}

// interface untuk create (biasanya tanpa id & timestamps)
interface IProjectCreate {
  location: string;
  unit: string;
  type: string;
  investor: string;
  project_leader: string;
  project_time: string; // jumlah hari target (string → biar konsisten sama backend)
  total_cost: number;
  project_start: string; // biasanya kirim format "YYYY-MM-DD"
  project_end: string; // sama kayak project_start
  note: string;
  project_status: string;
  company_id: string;
}

// interface untuk update (id wajib, created/updated_at opsional)
interface IProjectUpdate extends Partial<IProjectBase> {
  id: string;
  project_start?: Date | null;
  project_end?: Date | null;
}

// interface response list project dari API
interface IProjectData {
  projectList: IProjectItem[];
  total_project: number;
  page: number;
  limit: number;
  total: number;
}

// interface wrapper response API
interface IProjectResponse {
  data: IProjectData;
  message: string;
  status: string;
}
