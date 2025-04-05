interface IInfo {
  id: string;
  maps: string;
  start_price: number;
  home_id: string;
  near_by: INearBy[];
  created_at: string;
  updated_at: string;
}
interface IInfoCreate {
  maps: string;
  start_price: number;
  home_id: string;
  near_by: INearByCreate[];
}
interface IInfoResponse {
  data: IInfo[];
  status: string;
}
