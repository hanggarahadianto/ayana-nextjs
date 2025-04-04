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

export const validationSchemaProduct = Yup.object({
  title: Yup.string().required("Title is required"),
  location: Yup.string().required("Location is required"),
  type: Yup.string().required("Type is required"),
  content: Yup.string().required("Content is required"),
  address: Yup.string().required("Address is required"),
  bathroom: Yup.string().required("Bathroom is required"),
  bedroom: Yup.string().required("Bedroom is required"),
  square: Yup.string().required("Square footage is required"),
  status: Yup.string().oneOf(["Available", "Sold"], "Invalid status").required("Status is required"),
  price: Yup.number().positive("Price must be a positive number").required("Price is required"),
  sequence: Yup.number().integer("Sequence must be an integer").required("Sequence is required"),
  quantity: Yup.number().integer("Quantity must be an integer").min(1, "Quantity must be at least 1").required("Quantity is required"),
  file: Yup.string().required("File is required"),
});

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
