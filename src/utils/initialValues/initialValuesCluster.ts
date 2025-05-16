export const initialValuesClusterCreate: IClusterCreate = {
  name: "",
  location: "",
  square: 0,
  price: 0,
  quantity: 0,
  status: "", // default status
  sequence: 0,
  maps: "",
  near_bies: [
    {
      name: "",
      distance: "",
    },
  ],
  homes: null, // atau [] jika kamu pakai array
};
