"use client";
import React, { useCallback } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, NumberInput, SimpleGrid, FileInput, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form, FormikHelpers } from "formik";
import { showNotification } from "@mantine/notifications";
import { useSubmitProductForm } from "@/api/products/postDataProduct";
import { useUploadImageProduct } from "@/api/products/uploadImageProduct";
import { availabilityOptions, locationOptions, typeOptions } from "@/constants/dictionary";
import { validationSchemaProduct } from "@/utils/validation/product-validation";
import { initialValueProductCreate } from "@/utils/initialValues/initialValuesProduct";
import ButtonAdd from "@/components/common/button/buttonAdd";
import NearByForm from "./NearByForm";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";

type Props = {
  refetchProductData: () => void;
};

const handleChangeProduct = (field: keyof IProductCreate, value: any, setFieldValue: (field: string, value: any) => void) => {
  setFieldValue(field, value);
};

const AddProductModal: React.FC<Props> = ({ refetchProductData }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: postDataProduct, isPending: isLoadingSubmitProductData } = useSubmitProductForm(refetchProductData, close);
  const { mutate: uploadImageProduct, isPending: isUploadingImage } = useUploadImageProduct(refetchProductData, close);

  const handleSubmit = useCallback(
    async (values: IProductCreate, { resetForm }: FormikHelpers<IProductCreate>) => {
      try {
        postDataProduct(values, {
          onSuccess: () => {
            showNotification({
              title: "Berhasil",
              message: "Data berhasil disimpan",
              color: "green",
            });
            resetForm();
            close();
          },
          onError: (error: any) => {
            showNotification({
              title: "Gagal menyimpan data",
              message: error.message || "Terjadi kesalahan",
              color: "red",
            });
          },
        });
      } catch (error: any) {
        console.error("Submit Error:", error);
      }
    },
    [postDataProduct, close]
  );

  return (
    <SimpleGridGlobal cols={1}>
      <ButtonAdd onClick={open} size="3.5rem" />
      <Modal opened={opened} onClose={close} size={"100%"} yOffset="100px">
        <Formik initialValues={initialValueProductCreate} validationSchema={validationSchemaProduct} onSubmit={handleSubmit}>
          {({ values, errors, setFieldValue }) => {
            console.log("values", values);
            console.log("error", errors);
            return (
              <Form>
                <SimpleGrid p="40px" spacing="md">
                  <Group grow>
                    <TextInput
                      label="Nama Produk"
                      placeholder="Masukkan nama produk"
                      onChange={(e) => handleChangeProduct("title", e.currentTarget.value, setFieldValue)}
                      required
                    />
                    <Select
                      label="Nama Lokasi"
                      data={locationOptions}
                      placeholder="Pilih lokasi"
                      clearable
                      onChange={(value) => handleChangeProduct("location", value || "", setFieldValue)}
                    />
                    <Select
                      label="Tipe"
                      data={typeOptions}
                      placeholder="Pilih tipe"
                      clearable
                      onChange={(value) => handleChangeProduct("type", value || "", setFieldValue)}
                      required
                    />
                  </Group>

                  <TextInput
                    label="Alamat"
                    placeholder="Masukkan alamat"
                    onChange={(e) => handleChangeProduct("address", e.currentTarget.value, setFieldValue)}
                    required
                  />

                  <Textarea
                    label="Deskripsi"
                    placeholder="Masukkan deskripsi"
                    onChange={(e) => handleChangeProduct("content", e.currentTarget.value, setFieldValue)}
                    required
                  />

                  <Group grow>
                    <NumberInput
                      label="Kamar Mandi"
                      hideControls
                      placeholder="Masukkan jumlah kamar mandi"
                      onChange={(val) => handleChangeProduct("bathroom", val || 0, setFieldValue)}
                      required
                    />
                    <NumberInput
                      label="Kamar Tidur"
                      hideControls
                      placeholder="Masukkan jumlah kamar tidur"
                      onChange={(val) => handleChangeProduct("bedroom", val || 0, setFieldValue)}
                      required
                    />
                    <NumberInput
                      label="Luas Tanah"
                      hideControls
                      placeholder="Masukkan luas tanah"
                      onChange={(val) => handleChangeProduct("square", val || 0, setFieldValue)}
                      required
                    />
                  </Group>

                  <Group grow>
                    <Select
                      label="Status"
                      data={availabilityOptions}
                      placeholder="Pilih status"
                      clearable
                      onChange={(val) => handleChangeProduct("status", val || "", setFieldValue)}
                      required
                    />
                    <NumberInput
                      label="Kuantitas"
                      hideControls
                      placeholder="Masukkan kuantitas"
                      onChange={(val) => handleChangeProduct("quantity", val || 0, setFieldValue)}
                      required
                    />
                    <NumberInput
                      label="Harga Unit"
                      hideControls
                      placeholder="Masukkan harga unit"
                      onChange={(val) => handleChangeProduct("price", val || 0, setFieldValue)}
                      required
                    />
                  </Group>
                  <Textarea
                    label="Maps"
                    placeholder="Masukkan maps"
                    onChange={(e) => handleChangeProduct("maps", e.currentTarget.value, setFieldValue)}
                    required
                  />

                  <Divider p={12} mt={16} />

                  {/* Komponen untuk near_bies */}
                  <NearByForm setFieldValue={setFieldValue} />

                  <Group grow>
                    <NumberInput
                      w={40}
                      label="Urutan"
                      hideControls
                      placeholder="Masukkan urutan"
                      onChange={(val) => handleChangeProduct("sequence", val || 0, setFieldValue)}
                      required
                    />
                    {/* <FileInput
                      label="Upload Gambar"
                      accept="image/png,image/jpeg"
                      placeholder="Pilih gambar"
                      clearable
                      onChange={(file) => setFieldValue("file", file)}
                      required
                    /> */}
                  </Group>

                  <Group justify="flex-end" mt="md">
                    <Button onClick={close} variant="default">
                      Batal
                    </Button>
                    <Button type="submit" loading={isLoadingSubmitProductData || isUploadingImage}>
                      Simpan
                    </Button>
                  </Group>
                </SimpleGrid>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </SimpleGridGlobal>
  );
};

export default AddProductModal;
