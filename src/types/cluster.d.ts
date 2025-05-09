// types/cluster.d.ts

interface ICluster {
  id: string;
  name: string;
  location: string;
  square: number;
  price: number;
  quantity: number;
  status: "available" | "sold" | "booked" | string; // tambahkan opsi lain jika perlu
  sequence: number;
  maps: string;
  created_at: string; // bisa diganti ke Date jika diformat sebagai objek Date
  updated_at: string;
  homes: any | null; // sesuaikan jika struktur homes sudah diketahui
}

interface IClusterResponse {
  data: ICluster[];
  status: string;
}
