import React, { useEffect, useState } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, InputWrapper, NumberInput, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import BreathingActionIcon from "@/src/components/button/buttonAction";
import { getInitialValuesUpdateProduct } from "./initialValuesProduct";
import { IconPencil } from "@tabler/icons-react";
import { useEditProductForm } from "@/src/api/products/editDataProduct";

interface EditProductModalProps {
  initialData: IProductUpdate | undefined; // Adjust the type based on your actual data structure
  refetchProductData: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ initialData, refetchProductData }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updateData, isPending: isLoadingUpdateProductData } = useEditProductForm(refetchProductData, close);

  const handleSubmit = (values: IProductUpdate, { setSubmitting }: any) => {
    console.log("Updating product with values:", values);

    const formData = new FormData();
    formData.append("id", values.id);
    if (values.title) formData.append("title", values.title);
    if (values.location) formData.append("location", values.location);
    if (values.content) formData.append("content", values.content);
    if (values.address) formData.append("address", values.address);
    if (values.bathroom) formData.append("bathroom", values.bathroom);
    if (values.bedroom) formData.append("bedroom", values.bedroom);
    if (values.square) formData.append("square", values.square);
    if (values.status) formData.append("status", values.status);
    if (values.price) formData.append("price", values.price.toString());
    if (values.quantity) formData.append("quantity", values.quantity.toString());
    if (values.file) formData.append("file", values.file);

    updateData(formData);
    setSubmitting(false);
  };

  useEffect(() => {
    if (initialData) {
      // open();
    }
  }, [initialData]);

  return (
    <>
      <Stack>
        <BreathingActionIcon
          onClick={open}
          size="2.5rem"
          icon={<IconPencil size="1rem" />}
          color="linear-gradient(45deg, #90ee90, #00c6ff)"
        />
      </Stack>
      <Modal opened={opened} onClose={close} size="xl" yOffset="100px">
        <Formik
          initialValues={getInitialValuesUpdateProduct(initialData)}
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Stack p={20}>
                <Text>EDIT PRODUK</Text>
                <Text>{values?.title}</Text>
                <TextInput label="Title" value={values.title} onChange={(e) => setFieldValue("title", e.target.value)} />
                <InputWrapper
                  label="Nama Lokasi"
                  withAsterisk
                  //  error={touched.location && errors.location ? errors.location : undefined}
                >
                  <Select
                    placeholder="Pilih Lokasi"
                    onChange={(value: any) => setFieldValue("location", value)}
                    data={[
                      { value: "GAW", label: "GAW" },
                      { value: "ABW", label: "ABW" },
                    ]}
                  />
                </InputWrapper>
                <Textarea label="Content" value={values.content} onChange={(e) => setFieldValue("content", e.target.value)} />
                <TextInput label="Address" value={values.address} onChange={(e) => setFieldValue("address", e.target.value)} />
                <NumberInput label="Bathroom" value={values.bathroom} onChange={(value) => setFieldValue("bathroom", value)} />
                <NumberInput label="Bedroom" value={values.bedroom} onChange={(value) => setFieldValue("bedroom", value)} />
                <NumberInput label="Square" value={values.square} onChange={(value) => setFieldValue("square", value)} />
                <Select
                  label="Status"
                  value={values.status}
                  onChange={(value) => setFieldValue("status", value)}
                  data={[
                    { value: "available", label: "Available" },
                    { value: "sold", label: "Sold" },
                  ]}
                />
                <NumberInput label="Price" value={values.price} onChange={(value) => setFieldValue("price", value)} />
                <NumberInput label="Quantity" value={values.quantity} onChange={(value) => setFieldValue("quantity", value)} />
                {/* <InputWrapper label="Upload File">
                  <input type="file" onChange={(e) => setFieldValue("file", e.target.files[0])} />
                </InputWrapper> */}
                <Group justify="flex-end" mt="md">
                  <Button onClick={close} variant="default">
                    Cancel
                  </Button>
                  <Button type="submit" loading={isLoadingUpdateProductData}>
                    Update Product
                  </Button>
                </Group>
              </Stack>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default EditProductModal;
