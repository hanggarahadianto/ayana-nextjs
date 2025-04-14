import * as Yup from "yup";

export const initialValueProductCreate: IProductCreate = {
  title: "",
  location: "",

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
  file: "",
  // Assuming reservation can be any type
};

export const getInitialValuesUpdateProduct = (initialData?: IProductUpdate) => ({
  id: initialData?.id || "",
  title: initialData?.title || "",
  location: initialData?.location || "",
  content: initialData?.content || "",
  address: initialData?.address || "",
  bathroom: initialData?.bathroom || "",
  bedroom: initialData?.bedroom || "",
  square: initialData?.square || "",
  status: initialData?.status || "available",
  price: initialData?.price ?? 0, // Ensures price is a number
  quantity: initialData?.quantity ?? 1, // Ensures quantity is at least 1
  sequence: initialData?.sequence ?? 0, // Ensures sequcence is a number
  file: initialData?.file || "",
});
