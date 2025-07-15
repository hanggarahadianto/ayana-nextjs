interface PerformerResponse {
  id: string;
  name: string;
  total_booking: number;
  total_amount: number;
}

interface ISalesDashboardData {
  top_performers: PerformerResponse[];
  under_performers: PerformerResponse[];
}

interface ISalesDashboardResponse {
  data: ISalesDashboardData;
  message: string;
  status: string;
}
