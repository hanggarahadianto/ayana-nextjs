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
  near_bies: INearBy[];
}

interface IClusterCreate {
  name: string;
  location: string;
  square: number;
  price: number;
  quantity: number;
  status: "available" | "sold" | "booked" | string; // tambahkan opsi lain jika perlu
  sequence: number;
  maps: string;
  homes: any | null; // sesuaikan jika struktur homes sudah diketahui
  near_bies: INearByCreate[];
}
interface IClusterUpdate {
  id: string;
  name: string;
  location: string;
  square: number;
  price: number;
  quantity: number;
  status: "available" | "sold" | "booked" | string; // tambahkan opsi lain jika perlu
  sequence: number;
  maps: string;
  homes: any | null; // sesuaikan jika struktur homes sudah diketahui
  near_bies: INearByCreate[];
}

interface IClusterResponse {
  data: ICluster[];
  status: string;
}
