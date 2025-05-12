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
  location: string;
  content: string;
  address: string;
  bathroom: string;
  bedroom: string;
  square: string;
  status: string;
  sequence: number;
  price: number;
  quantity: number;
  maps: string;
  start_price: string;
  near_bies: INearBy[];
}

interface IProductResponse {
  data: IProduct[];
  status: string;
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
