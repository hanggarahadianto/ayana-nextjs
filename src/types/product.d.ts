interface IProduct {
  id: string;
  title: string;
  content: string;
  image: string;
  address: string;
  bathroom: string;
  bedroom: string;
  square: string;
  status: string;
  price: number;
  quantity: number;
  reservation: any;
  created_at: string;
  updated_at: string;
}

interface IProductCreate {
  title: string;
  content: string;
  image: string;
  address: string;
  bathroom: string;
  bedroom: string;
  square: string;
  status: string;
  price: number;
  quantity: number;
  reservation: any;
}

interface IProductUpdate {
  id: string;
  title?: string;
  content?: string;
  image?: string;
  address?: string;
  bathroom?: string;
  bedroom?: string;
  square?: string;
  status?: string;
  price?: number;
  quantity?: number;
  reservation?: any;
  created_at?: string;
  updated_at?: string;
}

interface IProductResponse {
  data: IProduct[];
  status: string;
}
