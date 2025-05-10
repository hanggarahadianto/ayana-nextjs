"use client";
import React, { useCallback, useState } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, NumberInput, SimpleGrid, Divider, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form, FormikHelpers } from "formik";
import { showNotification } from "@mantine/notifications";
import { useSubmitProductForm } from "@/api/products/postDataProduct";
import { availabilityOptions, locationOptions, typeOptions } from "@/constants/dictionary";
import { validationSchemaProduct } from "@/utils/validation/product-validation";
import { initialValueProductCreate } from "@/utils/initialValues/initialValuesProduct";
import ButtonAdd from "@/components/common/button/buttonAdd";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import UploadImageField from "./UploadProductImageForm";
import { useUploadImages } from "@/api/products/uploadImageProduct";

const handleChangeProduct = (field: keyof IProductCreate, value: any, setFieldValue: (field: string, value: any) => void) => {
  setFieldValue(field, value);
};
interface Props {
  clusterId?: string | null;
}

const AddProductModal = ({ clusterId }: Props) => {
  // console.log("cluster id", clusterId);
  const [opened, { open, close }] = useDisclosure(false);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const handleFilesChange = (files: File[]) => {
    setSelectedFiles(files);
  };

  const { mutate: postDataProduct, isPending: isLoadingSubmitProductData } = useSubmitProductForm();
  const { mutateAsync: uploadImage, isPending: isUploadingImage } = useUploadImages(close, clusterId!);

  const handleSubmit = useCallback(
    async (values: IProductCreate, { resetForm }: FormikHelpers<IProductCreate>) => {
      try {
        const payload = {
          ...values,
          cluster_id: clusterId ?? null,
        };

        postDataProduct(payload, {
          onSuccess: async (res: any) => {
            const productId = res?.id;

            if (!productId) {
              showNotification({
                title: "Gagal",
                message: "Tidak mendapat ID produk",
                color: "red",
              });
              return;
            }

            showNotification({
              title: "Berhasil",
              message: "Data berhasil disimpan. Mengunggah gambar...",
              color: "green",
            });

            console.log(selectedFiles);
            if (selectedFiles.length > 0) {
              console.log("📦 selectedFiles to upload:", selectedFiles);

              const formData = new FormData();
              selectedFiles.forEach((file, idx) => {
                console.log(`📁 Appending file[${idx}]:`, file.name);
                formData.append("images", file);
              });

              // Debug: cek isi formData
              for (let pair of formData.entries()) {
                console.log(`🔍 formData entry: ${pair[0]}`, pair[1]);
              }

              try {
                await uploadImage({ productId, formData });
                showNotification({
                  title: "Upload selesai",
                  message: "Gambar berhasil diunggah",
                  color: "green",
                });
              } catch {
                showNotification({
                  title: "Upload gagal",
                  message: "Terjadi kesalahan saat mengunggah gambar",
                  color: "red",
                });
              }
            }

            resetForm();
            setSelectedFiles([]);
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
      } catch (error) {
        console.error("Submit Error:", error);
      }
    },
    [postDataProduct, uploadImage, selectedFiles, close]
  );

  return (
    <SimpleGridGlobal cols={1}>
      {clusterId && <ButtonAdd onClick={open} size="3.5rem" />}

      <Modal opened={opened} onClose={close} size={"100%"} yOffset="100px">
        <Formik initialValues={initialValueProductCreate} validationSchema={validationSchemaProduct} onSubmit={handleSubmit}>
          {({ values, errors, setFieldValue }) => {
            // console.log("values", values);
            // console.log("error", errors);
            return (
              <SimpleGrid>
                <Form>
                  <SimpleGrid p="40px" spacing="md">
                    <Stack>
                      <Text fw={700} mb={40}>
                        Tambah Produk
                      </Text>
                    </Stack>

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
                    <Divider mt={20} />

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
                      <NumberInput
                        label="Kuantitas"
                        hideControls
                        placeholder="Masukkan kuantitas"
                        onChange={(val) => handleChangeProduct("quantity", val || 0, setFieldValue)}
                        required
                      />
                    </Group>

                    <Group grow>
                      <NumberInput
                        label="Harga Unit"
                        hideControls
                        placeholder="Masukkan harga unit"
                        onChange={(val) => handleChangeProduct("price", val || 0, setFieldValue)}
                        required
                      />
                      <NumberInput
                        label="Harga Awal"
                        hideControls
                        placeholder="Masukkan Harga Awal"
                        onChange={(val) => handleChangeProduct("start_price", val || 0, setFieldValue)}
                        required
                      />
                    </Group>
                    <Group>
                      <Select
                        label="Status"
                        data={availabilityOptions}
                        placeholder="Pilih status"
                        clearable
                        onChange={(val) => handleChangeProduct("status", val || "", setFieldValue)}
                        required
                      />
                      <NumberInput
                        label="Urutan"
                        hideControls
                        placeholder="Masukkan Urutan"
                        onChange={(val) => handleChangeProduct("sequence", val || 0, setFieldValue)}
                        required
                      />
                    </Group>

                    <Divider p={12} mt={16} />

                    {/* Komponen untuk near_bies */}
                    {/* <NearByForm setFieldValue={setFieldValue} /> */}

                    <Group grow>
                      <UploadImageField onFilesChange={handleFilesChange} />
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
              </SimpleGrid>
            );
          }}
        </Formik>
      </Modal>
    </SimpleGridGlobal>
  );
};

export default AddProductModal;
