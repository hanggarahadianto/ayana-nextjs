import React, { useCallback, useMemo } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, NumberInput, SimpleGrid, InputWrapper, FileInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { initialValueProductCreate, validationSchemaProduct } from "../../../../lib/initialValues/initialValuesProduct";
import { useSubmitProductForm } from "@/api/products/postDataProduct";
import ButtonAdd from "@/components/button/buttonAdd";

const AddProductModal = ({ refetchProductData }: { refetchProductData: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: postData, isPending: isLoadingSubmitProductData } = useSubmitProductForm(refetchProductData, close);

  const handleSubmit = useCallback(
    (values: IProductCreate, { setSubmitting }: any) => {
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
    },
    [postData]
  );

  const locationOptions = useMemo(
    () => [
      { value: "GAW", label: "GAW" },
      { value: "ABW", label: "ABW" },
    ],
    []
  );

  const typeOptions = useMemo(
    () => [
      { value: "32 / 60", label: "32 / 60" },
      { value: "36 / 60", label: "36 / 60" },
    ],
    []
  );

  const statusOptions = useMemo(
    () => [
      { value: "available", label: "Available" },
      { value: "sold", label: "Sold" },
    ],
    []
  );

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
                    <InputWrapper label="Nama Produk" withAsterisk>
                      <TextInput
                        placeholder="Masukan Nama Produk"
                        defaultValue={values.title}
                        onBlur={(e) => setFieldValue("title", e.target.value)} // Update saat onBlur
                      />
                    </InputWrapper>

                    <InputWrapper label="Nama Lokasi" withAsterisk>
                      <Select
                        placeholder="Pilih Lokasi"
                        defaultValue={values.location}
                        onBlur={(e) => setFieldValue("location", e.target.value)} // Update saat onBlur
                        data={locationOptions}
                      />
                    </InputWrapper>

                    <InputWrapper required>
                      <Select
                        label="Tipe"
                        placeholder="Pilih Tipe"
                        defaultValue={values.type}
                        onBlur={(e) => setFieldValue("type", e.target.value)} // Update saat onBlur
                        data={typeOptions}
                        required
                      />
                    </InputWrapper>
                  </Group>

                  <InputWrapper label="Address" required>
                    <TextInput
                      placeholder="Enter address"
                      defaultValue={values.address}
                      onBlur={(e) => setFieldValue("address", e.target.value)} // Update saat onBlur
                    />
                  </InputWrapper>

                  <InputWrapper label="Description" required>
                    <Textarea
                      placeholder="Enter description"
                      defaultValue={values.content} // Pastikan values.note sudah terdefinisi dalam Formik state
                      onBlur={(e) => setFieldValue("content", e.target.value)} // Update saat onBlur
                    />
                  </InputWrapper>

                  <Group>
                    <InputWrapper label="Bathroom" required>
                      <NumberInput
                        hideControls
                        placeholder="Enter number of bathrooms"
                        value={values.bathroom}
                        onChange={(value) => setFieldValue("bathroom", value)}
                        onBlur={handleBlur}
                      />
                    </InputWrapper>

                    <InputWrapper label="Bedroom" required>
                      <NumberInput
                        hideControls
                        placeholder="Enter number of bedrooms"
                        value={values.bedroom}
                        onChange={(value) => setFieldValue("bedroom", value)}
                        onBlur={handleBlur}
                      />
                    </InputWrapper>

                    <InputWrapper label="Square Meters" required>
                      <NumberInput
                        hideControls
                        placeholder="Enter square meters"
                        value={values.square}
                        onBlur={(e) => setFieldValue("square", e.target.value)} // Update saat onBlur
                      />
                    </InputWrapper>
                  </Group>

                  <Group>
                    <InputWrapper label="Status" required>
                      <Select
                        w={180}
                        placeholder="Select status"
                        value={values.status}
                        onBlur={(e) => setFieldValue("square", e.target.value)} // Update saat onBlur
                        data={statusOptions}
                      />
                    </InputWrapper>

                    <InputWrapper label="Price" required>
                      <TextInput
                        placeholder="Enter price"
                        defaultValue={values.price ? `Rp. ${values.price.toLocaleString("id-ID")}` : ""}
                        onBlur={(event) => {
                          const rawValue = event.target.value.replace(/\D/g, "");
                          const numericValue = Number(rawValue) || 0;
                          setFieldValue("price", numericValue);
                        }}
                      />
                    </InputWrapper>

                    <InputWrapper label="Quantity" required>
                      <NumberInput
                        hideControls
                        placeholder="Enter quantity"
                        value={values.quantity | 0}
                        onBlur={(e) => setFieldValue("quantity", e.target.value)} // Update saat onBlur
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
                      onBlur={handleBlur}
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
