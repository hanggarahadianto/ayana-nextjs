interface IPresenceItem {
  id: string; // UUID
  employee_id: string;
  scan_date: string; // ISO string (e.g., "2025-07-09")
  scan_time: string; // Jam dalam format HH:mm:ss
  raw_date: string; // Tanggal asli dari Excel, misal "09-07"
  company_id: string;
  created_at: string;
  updated_at: string;
  Employee: IEmployeeItem; // Relasi ke employee
}

interface IPresenceData {
  presenceList: IPresenceItem[];
  total_presence: number;
  page: number;
  limit: number;
  total: number;
}

interface IPresenceResponse {
  data: IPresenceData;
  message: string;
  status: string;
}
