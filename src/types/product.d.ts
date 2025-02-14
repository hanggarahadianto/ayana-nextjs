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
  file: string;
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
  quantity: number;
  file: string;
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
  price: number;
  quantity: number;
  file: string;
}

interface IProductResponse {
  data: IProduct[];
  status: string;
}
