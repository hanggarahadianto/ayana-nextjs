import React, { useEffect, useState } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, InputWrapper, NumberInput, Stack, Text, FileInput, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { getInitialValuesUpdateProduct } from "../../../../lib/initialValues/initialValuesProduct";
import { IconEdit } from "@tabler/icons-react";
import { useEditProductForm } from "@/api/products/editDataProduct";
import BreathingActionIcon from "@/lib/button/buttonAction";

interface EditProductModalProps {
  initialData: IProductUpdate | undefined; // Adjust the type based on your actual data structure
  refetchProductData: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ initialData, refetchProductData }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updateData, isPending: isLoadingUpdateProductData } = useEditProductForm(refetchProductData, close);

  const handleSubmit = (values: IProductUpdate, { setSubmitting }: any) => {
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
    }
  }, [initialData]);

  console.log("INITIAL DATA", initialData);

  return (
    <>
      <Stack>
        <BreathingActionIcon
          onClick={open}
          size="2.5rem"
          icon={<IconEdit size="1rem" />}
          gradient="linear-gradient(135deg, #93C5FD, #BFDBFE)"
        />
      </Stack>
      <Modal opened={opened} onClose={close} size="60rem" yOffset="100px">
        <Formik
          initialValues={getInitialValuesUpdateProduct(initialData)}
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => {
            console.log("EDIT", values);
            return (
              <Form>
                <Stack p={20}>
                  <Group gap={8}>
                    <Text>EDIT PRODUK</Text>
                    <Text>{values?.title}</Text>
                  </Group>

                  <InputWrapper
                    label="Nama Produk"
                    withAsterisk
                    // error={touched.unit && errors.unit ? errors.unit : undefined}
                  >
                    <TextInput
                      value={values?.title}
                      placeholder="Masukan Nama Produk"
                      onChange={(event) => setFieldValue("title", event.currentTarget.value)}
                    />
                  </InputWrapper>
                  <InputWrapper
                    label="Nama Lokasi"
                    withAsterisk
                    //  error={touched.location && errors.location ? errors.location : undefined}
                  >
                    <Select
                      value={values?.location}
                      placeholder="Pilih Lokasi"
                      onChange={(value: any) => setFieldValue("location", value)}
                      data={[
                        { value: "GAW", label: "GAW" },
                        { value: "ABW", label: "ABW" },
                      ]}
                    />
                  </InputWrapper>

                  <InputWrapper label="Address" required>
                    <TextInput
                      placeholder="Enter address"
                      value={values.address}
                      onChange={(e) => setFieldValue("address", e.target.value)}
                    />
                  </InputWrapper>
                  <InputWrapper label="Description" required>
                    <Textarea
                      placeholder="Enter description"
                      value={values.content}
                      onChange={(e) => setFieldValue("content", e.target.value)}
                    />
                  </InputWrapper>
                  <Group>
                    <InputWrapper label="Bathroom" required>
                      <NumberInput
                        hideControls
                        placeholder="Enter number of bathrooms"
                        value={values.bathroom}
                        onChange={(value) => setFieldValue("bathroom", value)}
                      />
                    </InputWrapper>

                    <InputWrapper label="Bedroom" required>
                      <NumberInput
                        hideControls
                        placeholder="Enter number of bedrooms"
                        value={values.bedroom}
                        onChange={(value) => setFieldValue("bedroom", value)}
                      />
                    </InputWrapper>
                    <InputWrapper label="Square Meters" required>
                      <NumberInput
                        hideControls
                        placeholder="Enter square meters"
                        value={values.square}
                        onChange={(value) => setFieldValue("square", value)}
                      />
                    </InputWrapper>
                  </Group>
                  <Group>
                    <InputWrapper label="Status" required>
                      <Select
                        // w={200}
                        placeholder="Select status"
                        data={[
                          { value: "available", label: "Available" },
                          { value: "sold", label: "Sold" },
                        ]}
                        value={values.status}
                        onChange={(value) => setFieldValue("status", value)}
                      />
                    </InputWrapper>
                    <InputWrapper label="Price" required>
                      <TextInput
                        placeholder="Enter price"
                        value={values.price ? `Rp. ${values.price.toLocaleString("id-ID")}` : ""}
                        onChange={(event) => {
                          const rawValue = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                          const numericValue = Number(rawValue) || 0;
                          setFieldValue("price", numericValue); // Store as number
                        }}
                      />
                    </InputWrapper>

                    <InputWrapper label="Quantity" required>
                      <NumberInput
                        hideControls
                        placeholder="Enter quantity"
                        value={values.quantity}
                        onChange={(value) => setFieldValue("quantity", value)}
                      />
                    </InputWrapper>
                  </Group>
                  <InputWrapper label="Upload files" required>
                    <FileInput
                      //   value={values?.file}
                      accept="image/png,image/jpeg"
                      w={200}
                      clearable
                      placeholder="Upload files"
                      onChange={(file) => setFieldValue("file", file)}
                    />
                  </InputWrapper>
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
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default EditProductModal;
