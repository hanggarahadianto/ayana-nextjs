interface Nearby {
  id: string;
  name: string;
  distance: string;
}

interface AdditionalInfo {
  id: string;
  maps: string;
  start_price: string;
  nearBy: Nearby[];
}
