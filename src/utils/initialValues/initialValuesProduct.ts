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

export const getInitialValuesUpdateProduct = (initialData?: Partial<IProductUpdate>): IProductUpdate => ({
  id: initialData?.id || "",
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
  start_price: Number(initialData?.start_price) || 0,
  type: initialData?.type || "",
  cluster_id: initialData?.cluster_id || "",
  near_bies: initialData?.near_bies || [],
});
