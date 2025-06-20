// import React, { useEffect, useState } from "react";
// import { TextInput, Button, Group, Select, Textarea, InputWrapper, NumberInput, Stack, Text, FileInput, Flex } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import { Form, Formik } from "formik";
// import { getInitialValuesUpdateProduct } from "../../../../utils/initialValues/initialValuesProduct";
// import { useEditProductForm } from "@/api/products/editDataProduct";

// interface EditProductModalProps {
//   initialData: IProductUpdate | undefined; // Adjust the type based on your actual data structure
//   refetchProductData: () => void;
// }

// const EditProductForm: React.FC<EditProductModalProps> = ({ initialData, refetchProductData }) => {
//   const [opened, { open, close }] = useDisclosure(false);

//   const { mutate: updateData, isPending: isLoadingUpdateProductData } = useEditProductForm(refetchProductData, close);
//   const handleSubmit = (values: IProductUpdate, { setSubmitting }: any) => {
//     const payload: IProductUpdate = {
//       ...values,
//       price: Number(values.price),
//       quantity: Number(values.quantity),
//       sequence: Number(values.sequence),
//     };

//     updateData(payload); // Kirim langsung sebagai JSON
//     setSubmitting(false);
//   };

//   return (
//     <>
//       <Formik
//         initialValues={getInitialValuesUpdateProduct(initialData)}
//         enableReinitialize
//         validateOnBlur={false}
//         validateOnChange={true}
//         validateOnMount={false}
//         onSubmit={handleSubmit}
//       >
//         {({ values, setFieldValue }) => {
//           console.log("EDIT", values);
//           return (
//             <Form>
//               <Stack p={20}>
//                 <InputWrapper
//                   label="Nama Produk"
//                   withAsterisk
//                   // error={touched.unit && errors.unit ? errors.unit : undefined}
//                 >
//                   <TextInput
//                     value={values?.title}
//                     placeholder="Masukan Nama Produk"
//                     onChange={(event) => setFieldValue("title", event.currentTarget.value)}
//                   />
//                 </InputWrapper>
//                 <InputWrapper
//                   label="Nama Lokasi"
//                   withAsterisk
//                   //  error={touched.location && errors.location ? errors.location : undefined}
//                 >
//                   <Select
//                     value={values?.location}
//                     placeholder="Pilih Lokasi"
//                     onChange={(value: any) => setFieldValue("location", value)}
//                     data={[
//                       { value: "GAW", label: "GAW" },
//                       { value: "ABW", label: "ABW" },
//                     ]}
//                   />
//                 </InputWrapper>

//                 <InputWrapper label="Address" required>
//                   <TextInput
//                     placeholder="Enter address"
//                     value={values.address}
//                     onChange={(e) => setFieldValue("address", e.target.value)}
//                   />
//                 </InputWrapper>
//                 <InputWrapper label="Description" required>
//                   <Textarea
//                     placeholder="Enter description"
//                     value={values.content}
//                     onChange={(e) => setFieldValue("content", e.target.value)}
//                   />
//                 </InputWrapper>
//                 <Group>
//                   <InputWrapper label="Bathroom" required>
//                     <NumberInput
//                       hideControls
//                       placeholder="Enter number of bathrooms"
//                       value={values.bathroom}
//                       onChange={(value) => setFieldValue("bathroom", value)}
//                     />
//                   </InputWrapper>

//                   <InputWrapper label="Bedroom" required>
//                     <NumberInput
//                       hideControls
//                       placeholder="Enter number of bedrooms"
//                       value={values.bedroom}
//                       onChange={(value) => setFieldValue("bedroom", value)}
//                     />
//                   </InputWrapper>
//                   <InputWrapper label="Square Meters" required>
//                     <NumberInput
//                       hideControls
//                       placeholder="Enter square meters"
//                       value={values.square}
//                       onChange={(value) => setFieldValue("square", value)}
//                     />
//                   </InputWrapper>
//                 </Group>
//                 <Group>
//                   <InputWrapper label="Status" required>
//                     <Select
//                       // w={200}
//                       placeholder="Select status"
//                       data={[
//                         { value: "available", label: "Available" },
//                         { value: "sold", label: "Sold" },
//                       ]}
//                       value={values.status}
//                       onChange={(value) => setFieldValue("status", value)}
//                     />
//                   </InputWrapper>
//                   <InputWrapper label="Price" required>
//                     <TextInput
//                       placeholder="Enter price"
//                       value={values.price ? `Rp. ${values.price.toLocaleString("id-ID")}` : ""}
//                       onChange={(event) => {
//                         const rawValue = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
//                         const numericValue = Number(rawValue) || 0;
//                         setFieldValue("price", numericValue); // Store as number
//                       }}
//                     />
//                   </InputWrapper>

//                   <InputWrapper label="Quantity" required>
//                     <NumberInput
//                       hideControls
//                       placeholder="Enter quantity"
//                       value={values.quantity}
//                       onChange={(value) => setFieldValue("quantity", value)}
//                     />
//                   </InputWrapper>
//                 </Group>
//                 <InputWrapper label="Upload files" required>
//                   <FileInput
//                     //   value={values?.file}
//                     accept="image/png,image/jpeg"
//                     w={200}
//                     clearable
//                     placeholder="Upload files"
//                     onChange={(file) => setFieldValue("file", file)}
//                   />
//                 </InputWrapper>
//                 <Group justify="flex-end" mt="md">
//                   <Button onClick={close} variant="default">
//                     Cancel
//                   </Button>
//                   <Button type="submit" loading={isLoadingUpdateProductData}>
//                     Update Product
//                   </Button>
//                 </Group>
//               </Stack>
//             </Form>
//           );
//         }}
//       </Formik>
//       {/* </Modal> */}
//     </>
//   );
// };

// export default EditProductForm;
