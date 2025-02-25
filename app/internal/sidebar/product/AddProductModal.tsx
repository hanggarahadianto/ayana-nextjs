import React from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Select,
  Textarea,
  NumberInput,
  ActionIcon,
  SimpleGrid,
  InputWrapper,
  FileInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { initialValueProductCreate, validationSchemaProduct } from "./initialValuesProduct";
import { useSubmitProductForm } from "@/api/products/postDataProduct";
import ButtonAdd from "@/components/button/buttonAdd";

const AddProductModal = ({ refetchProductData }: { refetchProductData: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: postData, isPending: isLoadingSubmitProductData } = useSubmitProductForm(refetchProductData, close);

  const handleSubmit = (values: IProductCreate, { setSubmitting }: any) => {
    const projectName =
      values.title && values.location && values.type ? `${values.title} - ${values.location} - ${values.type}` : "Unnamed Project";

    const formData = new FormData();

    formData.append("title", projectName);
    formData.append("location", values.location);
    formData.append("content", values.content);
    formData.append("address", values.address);
    formData.append("bathroom", values.bathroom.toString());
    formData.append("bedroom", values.bedroom.toString());
    formData.append("square", values.square.toString());
    formData.append("price", values.price.toString());
    formData.append("quantity", values.quantity.toString());
    formData.append("status", values.status);
    formData.append("type", values.type);

    if (values.file) {
      formData.append("file", values.file);
    }
    console.log("Form values submitted:", formData);
    postData(formData);
    setSubmitting(false);
  };

  return (
    <>
      <ButtonAdd onClick={open} size={"3.5rem"} />

      <Modal opened={opened} onClose={close} size="xl" yOffset={"100px"}>
        <Formik initialValues={initialValueProductCreate} validationSchema={validationSchemaProduct} onSubmit={handleSubmit}>
          {({ values, setFieldValue, errors, touched, handleBlur }) => {
            console.log("VALUES", values);
            return (
              <Form>
                <SimpleGrid p={20}>
                  <Group>
                    <InputWrapper
                      label="Nama Produk"
                      withAsterisk
                      // error={touched.unit && errors.unit ? errors.unit : undefined}
                    >
                      <TextInput
                        //  value={values?.unit.toUpperCase()}
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
                        placeholder="Pilih Lokasi"
                        onChange={(value: any) => setFieldValue("location", value)}
                        data={[
                          { value: "GAW", label: "GAW" },
                          { value: "ABW", label: "ABW" },
                        ]}
                      />
                    </InputWrapper>

                    <InputWrapper
                      required
                      //  error={touched.type && errors.type ? errors.type : undefined}
                    >
                      <Select
                        label="Tipe"
                        placeholder="Pilih Tipe"
                        onChange={(value: any) => setFieldValue("type", value)}
                        data={[
                          { value: "32 / 60", label: "32 / 60" },
                          { value: "36 / 60", label: "36 / 60" },
                        ]}
                        required
                      />
                    </InputWrapper>
                  </Group>

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
                      accept="image/png,image/jpeg"
                      w={200}
                      clearable
                      placeholder="Upload files"
                      onChange={(file) => setFieldValue("file", file)}
                    />
                  </InputWrapper>
                </SimpleGrid>

                <Group justify="flex-end" mt="md">
                  <Button onClick={close} variant="default">
                    Cancel
                  </Button>
                  <Button type="submit" loading={isLoadingSubmitProductData}>
                    Add Product
                  </Button>
                </Group>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default AddProductModal;
