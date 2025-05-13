"use client";
import React, { useCallback, useState } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, NumberInput, SimpleGrid, Divider, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form, FormikHelpers } from "formik";
import { showNotification } from "@mantine/notifications";
import { useUploadImages } from "@/api/products/uploadImageProduct";
import { useEditProductForm } from "@/api/products/editDataProduct";
import { validationSchemaProduct } from "@/utils/validation/product-validation";
import { getInitialValuesUpdateProduct, initialValueProductCreate } from "@/utils/initialValues/initialValuesProduct";
import { availabilityOptions, typeOptions } from "@/constants/dictionary";
import ButtonAdd from "@/components/common/button/buttonAdd";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import UploadImageField from "./UploadProductImageForm";
import NearByForm from "./NearByForm";
import LoadingGlobal from "@/styles/loading/loading-global";
import { useQuery } from "@tanstack/react-query";
import { getImages } from "@/api/products/getImagesProduct";

const UpdateProductModal = ({
  clusterId,
  refetchProductDataByCluster,
  opened,
  onClose,
  productData,
}: {
  clusterId?: string;
  refetchProductDataByCluster: () => void;
  opened: boolean;
  onClose: () => void;
  productData?: IProduct;
}) => {
  console.log("producut ", productData);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { mutate: updateDataProduct, isPending: isLoadingUpdateProductData } = useEditProductForm(refetchProductDataByCluster, onClose);
  const { mutateAsync: uploadImage, isPending: isUploadingImage } = useUploadImages(close, clusterId!);

  const handleFilesChange = (files: File[]) => setSelectedFiles(files);

  const formatCurrencyInput = (val: number | undefined) => (val ? `Rp. ${val.toLocaleString("id-ID")}` : "");

  const uploadProductImages = async (productId: string) => {
    if (!selectedFiles.length) return;

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("images", file));
    await uploadImage({ productId, formData });
  };

  const {
    data: dataImages,
    isLoading: isLoadingImageData,
    isPending: isPendngImageData,
  } = useQuery({
    queryKey: ["getImagesByProductId", productData?.id],
    queryFn: () => getImages(productData?.id),
    enabled: !!productData?.id,
  });

  console.log("data iamges", dataImages);

  const handleSubmit = useCallback(
    async (values: IProductUpdate, { resetForm }: FormikHelpers<IProductUpdate>) => {
      const payload = { ...values, cluster_id: clusterId ?? null };
      updateDataProduct(payload, {
        onSuccess: async (res: any) => {
          const productId = res?.id;
          if (!productId) {
            showNotification({ title: "Gagal", message: "ID produk tidak ditemukan", color: "red" });
            return;
          }

          try {
            await uploadProductImages(productId);
          } catch {
            showNotification({ title: "Upload gagal", message: "Gagal mengunggah gambar", color: "red" });
          }

          resetForm();
          setSelectedFiles([]);
          close();
        },
        onError: (error: any) => {
          showNotification({ title: "Gagal menyimpan", message: error.message, color: "red" });
        },
      });
    },
    [updateDataProduct, uploadImage, selectedFiles, clusterId, close]
  );

  return (
    <SimpleGridGlobal cols={1}>
      {/* <LoadingGlobal visible={isLoadingDetail} /> */}
      <Modal opened={opened} onClose={onClose} size="100%" yOffset="100px">
        <Formik
          enableReinitialize
          initialValues={getInitialValuesUpdateProduct(productData)}
          validationSchema={validationSchemaProduct}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => {
            console.log("values", values);
            return (
              <Form>
                <SimpleGrid p="40px" spacing="md">
                  <Stack>
                    <Text fw={700} mb={40}>
                      Ubah Produk
                    </Text>
                  </Stack>

                  <Group grow>
                    <TextInput
                      value={values.title}
                      label="Nama Produk"
                      placeholder="Masukkan nama produk"
                      error={touched.title && errors.title}
                      onChange={(e) => setFieldValue("title", e.currentTarget.value)}
                    />
                    <Select
                      label="Tipe"
                      placeholder="Pilih tipe"
                      clearable
                      data={typeOptions}
                      error={touched.type && errors.type}
                      onChange={(value) => setFieldValue("type", value || "")}
                    />
                  </Group>

                  <Textarea
                    value={values.content}
                    label="Deskripsi"
                    placeholder="Masukkan deskripsi"
                    error={touched.content && errors.content}
                    onChange={(e) => setFieldValue("content", e.currentTarget.value)}
                  />

                  <Divider mt={20} />

                  <Group grow>
                    <NumberInput
                      value={values.bathroom}
                      error={touched.bathroom && errors.bathroom ? errors.bathroom : undefined}
                      label="Kamar Mandi"
                      hideControls
                      placeholder="Masukkan jumlah kamar mandi"
                      onChange={(val) => setFieldValue("bathroom", val || 0)}
                    />
                    <NumberInput
                      value={values.bedroom}
                      error={touched.bedroom && errors.bedroom ? errors.bedroom : undefined}
                      label="Kamar Tidur"
                      hideControls
                      placeholder="Masukkan jumlah kamar tidur"
                      onChange={(val) => setFieldValue("bedroom", val || 0)}
                    />
                    <NumberInput
                      value={values.square}
                      error={touched.square && errors.square ? errors.square : undefined}
                      label="Luas Tanah"
                      hideControls
                      placeholder="Masukkan luas tanah"
                      onChange={(val) => setFieldValue("square", val || 0)}
                    />
                    <NumberInput
                      value={values.quantity}
                      error={touched.quantity && errors.quantity ? errors.quantity : undefined}
                      label="Kuantitas"
                      hideControls
                      placeholder="Masukkan kuantitas"
                      onChange={(val) => setFieldValue("quantity", val || 0)}
                    />
                  </Group>

                  <Group grow>
                    <TextInput
                      label="Harga Produk"
                      placeholder="Masukkan harga produk"
                      value={formatCurrencyInput(values.price)}
                      error={touched.price && errors.price}
                      onChange={(e) => {
                        const raw = e.currentTarget.value.replace(/\D/g, "");
                        setFieldValue("price", Number(raw) || 0);
                      }}
                    />
                    <TextInput
                      label="Harga Awal"
                      placeholder="Masukkan harga awal"
                      value={formatCurrencyInput(values.start_price)}
                      error={touched.start_price && errors.start_price}
                      onChange={(e) => {
                        const raw = e.currentTarget.value.replace(/\D/g, "");
                        setFieldValue("start_price", Number(raw) || 0);
                      }}
                    />
                  </Group>

                  <Group>
                    <Select
                      value={values.status}
                      label="Status"
                      placeholder="Pilih status"
                      clearable
                      data={availabilityOptions}
                      error={touched.status && errors.status}
                      onChange={(val) => setFieldValue("status", val || "")}
                    />
                    <NumberInput
                      value={values.sequence}
                      label="Urutan"
                      hideControls
                      placeholder="Masukkan urutan"
                      error={touched.sequence && errors.sequence}
                      onChange={(val) => setFieldValue("sequence", val || 0)}
                    />
                  </Group>

                  <Divider p={12} mt={16} />

                  <NearByForm setFieldValue={setFieldValue} values={values} />

                  {/* <UploadImageField onFilesChange={handleFilesChange} />
                   */}

                  <UploadImageField onFilesChange={handleFilesChange} existingImages={dataImages?.images} />

                  <Group justify="flex-end" mt="md">
                    <Button variant="default" onClick={close}>
                      Batal
                    </Button>
                    <Button type="submit" loading={isLoadingUpdateProductData || isUploadingImage}>
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

export default UpdateProductModal;
