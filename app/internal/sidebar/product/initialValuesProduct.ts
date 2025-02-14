import * as Yup from "yup";

export const initialValueProductCreate: IProductCreate = {
  title: "",
  content: "",
  image: "",
  address: "",
  bathroom: "",
  bedroom: "",
  square: "",
  status: "",
  price: 0,
  quantity: 0,
  reservation: null, // Assuming reservation can be any type
};

export const validationSchemaProduct = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  address: Yup.string().required("Address is required"),
  bathroom: Yup.string().required("Bathroom is required"),
  bedroom: Yup.string().required("Bedroom is required"),
  square: Yup.string().required("Square footage is required"),
  status: Yup.string().oneOf(["available", "sold"], "Invalid status").required("Status is required"),
  price: Yup.number().positive("Price must be a positive number").required("Price is required"),
  quantity: Yup.number().integer("Quantity must be an integer").min(1, "Quantity must be at least 1").required("Quantity is required"),
});

export const getInitialValuesUpdateProduct = (initialData?: IProductUpdate) => ({
  title: initialData?.title || "",
  content: initialData?.content || "",
  image: initialData?.image || "",
  address: initialData?.address || "",
  bathroom: initialData?.bathroom || "",
  bedroom: initialData?.bedroom || "",
  square: initialData?.square || "",
  status: initialData?.status || "available",
  price: initialData?.price ?? 0, // Ensures price is a number
  quantity: initialData?.quantity ?? 1, // Ensures quantity is at least 1
});
