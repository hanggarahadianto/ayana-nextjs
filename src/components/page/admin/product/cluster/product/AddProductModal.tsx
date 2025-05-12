"use client";
import React, { useCallback, useState } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, NumberInput, SimpleGrid, Divider, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form, FormikHelpers } from "formik";
import { showNotification } from "@mantine/notifications";
import { useSubmitProductForm } from "@/api/products/postDataProduct";
import { availabilityOptions, typeOptions } from "@/constants/dictionary";
import { validationSchemaProduct } from "@/utils/validation/product-validation";
import { initialValueProductCreate } from "@/utils/initialValues/initialValuesProduct";
import ButtonAdd from "@/components/common/button/buttonAdd";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import UploadImageField from "./UploadProductImageForm";
import { useUploadImages } from "@/api/products/uploadImageProduct";
import NearByForm from "./NearByForm";

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
          {({ values, errors, touched, setFieldValue }) => {
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
                        error={touched.title && errors.title ? errors.title : undefined}
                        label="Nama Produk"
                        placeholder="Masukkan nama produk"
                        onChange={(e) => handleChangeProduct("title", e.currentTarget.value, setFieldValue)}
                      />

                      <Select
                        error={touched.type && errors.type ? errors.type : undefined}
                        label="Tipe"
                        data={typeOptions}
                        placeholder="Pilih tipe"
                        clearable
                        onChange={(value) => handleChangeProduct("type", value || "", setFieldValue)}
                      />
                    </Group>

                    <Textarea
                      error={touched.content && errors.content ? errors.content : undefined}
                      label="Deskripsi"
                      placeholder="Masukkan deskripsi"
                      onChange={(e) => handleChangeProduct("content", e.currentTarget.value, setFieldValue)}
                    />
                    <Divider mt={20} />

                    <Group grow>
                      <NumberInput
                        error={touched.bathroom && errors.bathroom ? errors.bathroom : undefined}
                        label="Kamar Mandi"
                        hideControls
                        placeholder="Masukkan jumlah kamar mandi"
                        onChange={(val) => handleChangeProduct("bathroom", val || 0, setFieldValue)}
                      />
                      <NumberInput
                        error={touched.bedroom && errors.bedroom ? errors.bedroom : undefined}
                        label="Kamar Tidur"
                        hideControls
                        placeholder="Masukkan jumlah kamar tidur"
                        onChange={(val) => handleChangeProduct("bedroom", val || 0, setFieldValue)}
                      />
                      <NumberInput
                        error={touched.square && errors.square ? errors.square : undefined}
                        label="Luas Tanah"
                        hideControls
                        placeholder="Masukkan luas tanah"
                        onChange={(val) => handleChangeProduct("square", val || 0, setFieldValue)}
                      />
                      <NumberInput
                        error={touched.quantity && errors.quantity ? errors.quantity : undefined}
                        label="Kuantitas"
                        hideControls
                        placeholder="Masukkan kuantitas"
                        onChange={(val) => handleChangeProduct("quantity", val || 0, setFieldValue)}
                      />
                    </Group>

                    <Group grow>
                      <TextInput
                        error={touched.price && errors.price ? errors.price : undefined}
                        label="Harga Produk"
                        placeholder="Masukkan Harga Produk"
                        value={values.price ? `Rp. ${values.price.toLocaleString("id-ID")}` : ""}
                        onChange={(e) => {
                          const raw = e.currentTarget.value.replace(/\D/g, "");
                          const numeric = Number(raw) || 0;
                          handleChangeProduct("price", numeric, setFieldValue);
                        }}
                      />
                      <TextInput
                        error={touched.start_price && errors.start_price ? errors.start_price : undefined}
                        label="Harga Awal"
                        placeholder="Masukkan Harga Awal"
                        value={values.start_price ? `Rp. ${values.start_price.toLocaleString("id-ID")}` : ""}
                        onChange={(e) => {
                          const raw = e.currentTarget.value.replace(/\D/g, "");
                          const numeric = Number(raw) || 0;
                          handleChangeProduct("start_price", numeric, setFieldValue);
                        }}
                      />
                    </Group>
                    <Group>
                      <Select
                        error={touched.status && errors.status ? errors.status : undefined}
                        label="Status"
                        data={availabilityOptions}
                        placeholder="Pilih status"
                        clearable
                        onChange={(val) => handleChangeProduct("status", val || "", setFieldValue)}
                      />
                      <NumberInput
                        error={touched.sequence && errors.sequence ? errors.sequence : undefined}
                        label="Urutan"
                        hideControls
                        placeholder="Masukkan Urutan"
                        onChange={(val) => handleChangeProduct("sequence", val || 0, setFieldValue)}
                      />
                    </Group>

                    <Divider p={12} mt={16} />

                    <NearByForm setFieldValue={setFieldValue} values={values} />

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
