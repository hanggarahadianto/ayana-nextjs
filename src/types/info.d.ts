interface IInfo {
  id: string;
  maps: string;
  start_price: string;
  home_id: string;
  near_by: INearBy[];
  created_at: string;
  updated_at: string;
}
interface IInfoResponse {
  data: IInfo[];
  status: string;
}
