interface Product {
  ID: string;
  title: string;
  content: string;
  image: string;
  address: string;
  bathroom: string;
  bedroom: string;
  square: string;
  reservation: any;
  created_at: string;
  updated_at: string;
}

interface ProductResponse {
  data: Product[];
  status: string;
}
