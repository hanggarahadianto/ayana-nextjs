import * as Yup from "yup";

export const validationSchemaProduct = Yup.object({
  title: Yup.string().required("Title is required"),
  type: Yup.string().required("Type is required"),
  content: Yup.string().required("Content is required"),
  bathroom: Yup.number().min(0, "Minimum 0").required("Bathroom is required"),
  bedroom: Yup.number().min(0, "Minimum 0").required("Bedroom is required"),
  square: Yup.string().required("Square footage is required"),
  status: Yup.string().oneOf(["available", "sold"], "Invalid status").required("Status is required"),
  price: Yup.number().positive("Price must be a positive number").required("Price is required"),
  sequence: Yup.number().positive("Sequence must be a positive number").required("Sequence is required"),
  quantity: Yup.number().integer("Quantity must be an integer").min(1, "Quantity must be at least 1").required("Quantity is required"),
});
