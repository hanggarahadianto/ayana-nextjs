interface IProduct {
  id: string;
  title: string;
  content: string;
  image: string;
  bathroom: string;
  bedroom: string;
  square: string;
  status: string;
  price: number;
  quantity: number;
  sequence: number;
  start_price: number;
  near_bies: INearBy[];
  created_at: string;
  cluster_id: string | null;
  updated_at: string;
}

interface IProductCreate {
  title: string;
  type: string;
  content: string;
  address: string;
  bathroom: string;
  bedroom: string;
  square: string;
  status: string;
  price: number;
  sequence: number;
  quantity: number;
  start_price: number;
  cluster_id: string | null;
  near_bies: INearByCreate[];
}

interface IProductUpdate {
  id: string;
  title: string;
  type: string;
  content: string;
  address: string;
  bathroom: string;
  bedroom: string;
  square: string;
  status: string;
  price: number;
  sequence: number;
  quantity: number;
  start_price: number;
  cluster_id: string | null;
  near_bies: INearByCreate[];
}

interface IProductResponse {
  data: IProduct[];
  limit: number;
  offset: number;
  status: string;
  total: number;
}

interface INearBy {
  id: string;
  name: string;
  distance: string;
}
interface INearByCreate {
  name: string;
  distance: string;
}
