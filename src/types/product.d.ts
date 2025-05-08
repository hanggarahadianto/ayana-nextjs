interface IProduct {
  id: string;
  title: string;
  location: string;
  content: string;
  image: string;
  address: string;
  bathroom: string;
  bedroom: string;
  square: string;
  status: string;
  price: number;
  quantity: number;
  sequence: number;
  maps: string;
  start_price: string;
  near_by: INearBy[];
  created_at: string;
  updated_at: string;
}

interface IProductCreate {
  title: string;
  location: string;
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
  maps: string;
  start_price: string;
  near_by: INearBy[];
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
  near_by: INearBy[];
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
