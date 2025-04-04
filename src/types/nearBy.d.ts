interface INearBy {
  id: string;
  name: string;
  distance: number;
  info_id: string;
}
interface INearByCreate {
  name: string;
  distance: number;
  info_id: string;
}

interface INearBy {
  data: INearBy[];
  status: string;
}
