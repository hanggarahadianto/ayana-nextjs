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

export const getInitialValuesUpdateCluster = (initialValuesCluster?: Partial<IClusterUpdate>): IClusterUpdate => ({
  id: initialValuesCluster?.id || "",
  name: initialValuesCluster?.name || "",
  location: initialValuesCluster?.location || "",
  square: initialValuesCluster?.square || 0,
  price: initialValuesCluster?.price || 0,
  quantity: initialValuesCluster?.quantity || 0,
  status: initialValuesCluster?.status || "",
  sequence: initialValuesCluster?.sequence || 0,
  maps: initialValuesCluster?.maps || "",
  near_bies: initialValuesCluster?.near_bies?.length ? initialValuesCluster.near_bies : [{ name: "", distance: "" }],
  homes: initialValuesCluster?.homes || null,
});
