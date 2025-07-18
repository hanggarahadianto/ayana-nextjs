interface IProduct {
  id: string;
  title: string;
  content: string;
  type: string;
  image: string;
  location: string;
  bathroom: number;
  bedroom: number;
  square: number;
  status: string;
  price: number;
  quantity: number;
  sequence: number;
  start_price: number;
  maps: string;
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
  bathroom: number;
  bedroom: number;
  square: number;
  status: string;
  price: number;
  sequence: number;
  quantity: number;
  start_price: number;
  cluster_id: string | null;
}

interface IProductUpdate {
  id: string;
  title: string;
  type: string;
  content: string;
  address: string;
  bathroom: number;
  bedroom: number;
  square: number;
  status: string;
  price: number;
  sequence: number;
  quantity: number;
  start_price: number;
  cluster_id: string | null;
  keepImageIds?: string[];
  originalKeepImageIds?: string[];
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
