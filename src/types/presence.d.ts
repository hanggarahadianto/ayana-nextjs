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

interface IPresenceRuleItem {
  id: string;
  company_id: string;
  day: string; // "Monday", "Tuesday", etc.
  is_holiday: boolean;
  start_time: string; // "07:00"
  end_time: string; // "16:00"
  grace_period_mins: number;
  arrival_tolerances: number[]; // e.g., [10, 15, 5]
  departure_tolerances: number[]; // e.g., [5, 10]
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}
interface IPresenceRuleCreate {
  company_id: string;
  day: string; // "Monday", "Tuesday", etc.
  is_holiday: boolean;
  start_time: string; // "07:00"
  end_time: string; // "16:00"
  grace_period_mins: number;
  arrival_tolerances: number[]; // e.g., [10, 15, 5]
  departure_tolerances: number[]; // e.g., [5, 10]
}
interface IPresenceRuleUpdate {
  id: string;
  company_id: string;
  day: string; // "Monday", "Tuesday", etc.
  is_holiday: boolean;
  start_time: string; // "07:00"
  end_time: string; // "16:00"
  grace_period_mins: number;
  arrival_tolerances: number[]; // e.g., [10, 15, 5]
  departure_tolerances: number[]; // e.g., [5, 10]
}

interface IPresenceRuleResponse {
  message: string;
  presenceRules: IPresenceRule[];
}
