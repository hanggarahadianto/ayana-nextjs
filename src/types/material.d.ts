interface IMaterial {
  id: string;
  material_name: string;
  quantity: number;
  total_cost: number;
  price: number;
  unit: string;
}

interface IMaterialCreate {
  material_name: string;
  quantity: number;
  total_cost: number;
  price: number;
  unit: string;
}

interface IMaterialUpdate {
  id: string;
  material_name: string;
  quantity: number;
  total_cost: number;
  price: number;
  unit: string;
}
