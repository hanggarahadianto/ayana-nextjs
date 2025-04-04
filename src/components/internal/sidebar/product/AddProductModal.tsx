import React, { useCallback, useMemo } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, NumberInput, SimpleGrid, InputWrapper, FileInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { initialValueProductCreate, validationSchemaProduct } from "../../../../lib/initialValues/initialValuesProduct";
import { useSubmitProductForm } from "@/api/products/postDataProduct";
import ButtonAdd from "@/lib/button/buttonAdd";

const AddProductModal = ({ refetchProductData }: { refetchProductData: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: postDataProduct, isPending: isLoadingSubmitProductData } = useSubmitProductForm(refetchProductData, close);

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
      formData.append("sequence", values.sequence.toString());
      formData.append("type", values.type);

      if (values.file) {
        formData.append("file", values.file);
      }

      console.log("Form values submitted:", formData);
      postDataProduct(formData);
      setSubmitting(false);
    },
    [postDataProduct]
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
            console.log("error", errors);

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

                  <InputWrapper label="Alamat" required>
                    <TextInput
                      placeholder="Masukan Alamat"
                      defaultValue={values.address}
                      onBlur={(e) => setFieldValue("address", e.target.value)} // Update saat onBlur
                    />
                  </InputWrapper>

                  <InputWrapper label="Deskripsi" required>
                    <Textarea
                      placeholder="Masukan Deskripsi"
                      defaultValue={values.content} // Pastikan values.note sudah terdefinisi dalam Formik state
                      onBlur={(e) => setFieldValue("content", e.target.value)} // Update saat onBlur
                    />
                  </InputWrapper>

                  <Group>
                    <InputWrapper label="Kamar Mandi" required>
                      <NumberInput
                        hideControls
                        placeholder="Masukan Jumlah Kamar Mandi"
                        value={values.bathroom}
                        onChange={(value) => setFieldValue("bathroom", value)}
                        onBlur={handleBlur}
                      />
                    </InputWrapper>

                    <InputWrapper label="Kamar Tidur" required>
                      <NumberInput
                        hideControls
                        placeholder="Masukan Jumlah Kamar Tidur"
                        value={values.bedroom}
                        onChange={(value) => setFieldValue("bedroom", value)}
                        onBlur={handleBlur}
                      />
                    </InputWrapper>

                    <InputWrapper label="Luas Tanah" required>
                      <NumberInput
                        hideControls
                        placeholder="Masukan Luas Tanah"
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
                        defaultValue={values?.status}
                        onBlur={(e) => setFieldValue("status", e.target.value)} // Update saat onBlur
                        data={statusOptions}
                      />
                    </InputWrapper>

                    <InputWrapper label="Harga" required>
                      <TextInput
                        placeholder="Masukan Harga (Rp)"
                        defaultValue={values.price ? `Rp. ${Number(values.price).toLocaleString("id-ID")}` : ""}
                        onBlur={(event) => {
                          const rawValue = event.target.value.replace(/[^0-9]/g, "");
                          const numericValue = rawValue === "" ? 0 : Number(rawValue);
                          setFieldValue("price", numericValue);
                          // Optional: Untuk memformat ulang input setelah blur
                          event.target.value = numericValue ? `Rp. ${numericValue.toLocaleString("id-ID")}` : "";
                        }}
                      />
                    </InputWrapper>

                    <InputWrapper label="Kuantitas" required>
                      <NumberInput
                        hideControls
                        placeholder="Masukan Kuantitas"
                        defaultValue={values.quantity ? values.quantity : ""}
                        onBlur={(e) => setFieldValue("quantity", e.target.value)} // Update saat onBlur
                      />
                    </InputWrapper>
                  </Group>

                  <Group>
                    <InputWrapper label="Urutan" required>
                      <NumberInput
                        hideControls
                        placeholder="Masukan Urutan"
                        defaultValue={values.sequence ? values.sequence : ""}
                        onBlur={(e) => setFieldValue("sequence", e.target.value)} // Update saat onBlur
                      />
                    </InputWrapper>
                    <InputWrapper label="Upload Gambar" required>
                      <FileInput
                        accept="image/png,image/jpeg"
                        w={200}
                        clearable
                        placeholder="Upload files"
                        onChange={(file) => setFieldValue("file", file)}
                        onBlur={handleBlur}
                      />
                    </InputWrapper>
                  </Group>
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
