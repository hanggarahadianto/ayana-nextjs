export const initialValueProductCreate: IProductCreate = {
  title: "",
  type: "",
  content: "",
  address: "",
  bathroom: "",
  bedroom: "",
  square: "",
  status: "",
  price: 0,
  sequence: 0,
  quantity: 0,

  start_price: 0,
  near_bies: [
    {
      name: "",
      distance: "",
    },
  ],
  cluster_id: "",
};

export const getInitialValuesUpdateProduct = (initialData?: IProductUpdate) => ({
  id: initialData?.id || "", // <-- tambahkan ini
  title: initialData?.title || "",
  content: initialData?.content || "",
  address: initialData?.address || "",
  bathroom: initialData?.bathroom || "",
  bedroom: initialData?.bedroom || "",
  square: initialData?.square || "",
  status: initialData?.status || "available",
  price: initialData?.price ?? 0,
  quantity: initialData?.quantity ?? 1,
  sequence: initialData?.sequence ?? 0,
  map: initialData?.maps || "",
  start_price: Number(initialData?.start_price) || 0,
  near_by: [],
});
