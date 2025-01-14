interface Product {
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

interface ProductResponse {
  data: Product[];
  status: string;
}
