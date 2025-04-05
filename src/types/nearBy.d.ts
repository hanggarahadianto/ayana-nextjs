interface INearBy {
  id: string;
  name: string;
  distance: string;
}
interface INearByCreate {
  name: string;
  distance: string;
}

interface INearBy {
  data: INearBy[];
  status: string;
}
