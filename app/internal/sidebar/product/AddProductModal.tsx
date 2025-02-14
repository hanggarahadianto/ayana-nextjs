import React from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, NumberInput, ActionIcon, SimpleGrid, InputWrapper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { IconPlus } from "@tabler/icons-react";
import { initialValueProductCreate, validationSchemaProduct } from "./initialValuesProduct";
import { useSubmitProductForm } from "@/src/api/products/postDataProduct";
import ButtonAdd from "@/src/components/button/buttonAdd";

const AddProductModal = ({ refetchProductData }: { refetchProductData: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: postData, isPending: isLoadingSubmitProductData } = useSubmitProductForm(refetchProductData, close);

  const handleSubmit = (values: IProductCreate, { setSubmitting }: any) => {
    console.log("Form values submitted:", values);
    postData(values);
    setSubmitting(false);
  };

  return (
    <>
      <ButtonAdd onClick={open} size={"3.5rem"} />

      <Modal opened={opened} onClose={close} size="xl" yOffset={"100px"}>
        <Formik initialValues={initialValueProductCreate} validationSchema={validationSchemaProduct} onSubmit={handleSubmit}>
          {({ values, setFieldValue, errors, touched, handleBlur }) => (
            <Form>
              <SimpleGrid p={20}>
                <Group>
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
                    label="Nama Blok"
                    withAsterisk
                    // error={touched.unit && errors.unit ? errors.unit : undefined}
                  >
                    <TextInput
                      //  value={values?.unit.toUpperCase()}
                      placeholder="Masukan Nama Blok"
                      onChange={(event) => setFieldValue("unit", event.currentTarget.value.toUpperCase())}
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
                    <NumberInput
                      placeholder="Enter price"
                      value={values.price}
                      onChange={(value) => setFieldValue("price", value)}
                      thousandSeparator
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

                <InputWrapper label="Image URL" required>
                  <TextInput placeholder="Enter image URL" value={values.image} onChange={(e) => setFieldValue("image", e.target.value)} />
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
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AddProductModal;
