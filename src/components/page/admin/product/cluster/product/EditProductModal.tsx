"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, NumberInput, SimpleGrid, Divider, Stack, Text } from "@mantine/core";
import { Formik, Form, FormikHelpers } from "formik";
import { showNotification } from "@mantine/notifications";
import { useEditProductForm } from "@/api/products/editDataProduct";
import { validationSchemaProduct } from "@/utils/validation/product-validation";
import { getInitialValuesUpdateProduct } from "@/utils/initialValues/initialValuesProduct";
import { availabilityOptions, typeOptions } from "@/constants/dictionary";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import NearByForm from "./NearByForm";
import { useQuery } from "@tanstack/react-query";
import { getImages } from "@/api/products/getImagesProduct";
import { useUpdateImageProduct } from "@/api/products/updateImageProduct";
import UpdateImageField from "./UpdateProductImageForm";
import LoadingGlobal from "@/styles/loading/loading-global";

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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [keepImageIds, setKeepImageIds] = useState<string[]>([]); // ✅ ini penting
  const [originalKeepImageIds, setOriginalKeepImageIds] = useState<string[]>([]);

  console.log("keepImageId di parent", keepImageIds);
  // console.log("selected file", selectedFiles);

  const handleFilesChange = (files: File[]) => {
    setSelectedFiles(files);
  };

  const { mutate: updateDataProduct, isPending: isLoadingUpdateProductData } = useEditProductForm(refetchProductDataByCluster, onClose);
  const { mutateAsync: updateImageProduct, isPending: isUploadingImage } = useUpdateImageProduct(clusterId!);

  const formatCurrencyInput = (val: number | undefined) => (val ? `Rp. ${val.toLocaleString("id-ID")}` : "");

  const {
    data: dataImages,
    isLoading: isLoadingImageData,
    isPending: isPendngImageData,
  } = useQuery({
    queryKey: ["getImagesByProductId", productData?.id],
    queryFn: () => getImages(productData?.id),
    enabled: !!productData?.id,
  });

  // console.log("data image", dataImages);

  // console.log("ORIGINAL KEEP", originalKeepImageIds);

  useEffect(() => {
    if (dataImages && Array.isArray(dataImages.images)) {
      const idsFromServer = dataImages.images.map((img) => img.id);
      setOriginalKeepImageIds(idsFromServer);
      setKeepImageIds(idsFromServer);
    }
  }, [dataImages]);

  const arraysAreEqualIgnoreOrder = (arr1: string[], arr2: string[]) => {
    if (arr1.length !== arr2.length) return false;
    const sorted1 = [...arr1].sort();
    const sorted2 = [...arr2].sort();
    return sorted1.every((val, idx) => val === sorted2[idx]);
  };

  const keepImageIdsRef = useRef<string[]>([]);
  const handleKeepIdsChange = (ids: string[]) => {
    setKeepImageIds(ids);
    keepImageIdsRef.current = ids;
  };

  const handleSubmit = useCallback(
    async (values: IProductUpdate, { resetForm }: FormikHelpers<IProductUpdate>) => {
      const payload = {
        ...values,
        cluster_id: clusterId ?? null,
        keepImageIds: keepImageIds, // dari React state
        originalKeepImageIds: originalKeepImageIds, // dari React state
      };

      console.log("KEEP IMAGE DI ON SUBMIT", payload.keepImageIds);
      const productId = productData?.id;

      if (!productId) {
        showNotification({ title: "Gagal", message: "ID produk tidak ditemukan", color: "red" });
        return;
      }

      const isDataEdited = JSON.stringify(values) !== JSON.stringify(productData);

      try {
        if (isDataEdited) {
          updateDataProduct(payload);
        }

        const isImageEdited = !arraysAreEqualIgnoreOrder(payload.keepImageIds, payload.originalKeepImageIds);
        console.log("IS EDITED", isImageEdited);

        const isNewFilesAdded = selectedFiles.length > 0;
        const isAllImagesRemoved = payload.keepImageIds.length === 0;
        if (isImageEdited || isNewFilesAdded || isAllImagesRemoved) {
          const formData = new FormData();

          payload.keepImageIds.forEach((id) => formData.append("keepImageIds", id));
          selectedFiles.forEach((file) => formData.append("images", file));

          console.log("📤 fetching update gambar...");
          await updateImageProduct({ productId, formData });
          console.log("✅ upload selesai");
        } else {
          console.log("⏩ tidak ada perubahan gambar, skip upload");
        }

        // 3. Tampilkan notifikasi dan reset form

        refetchProductDataByCluster();
        resetForm();
        setSelectedFiles([]);
        onClose();
      } catch (error: any) {
        showNotification({
          title: "Gagal",
          message: error?.message || "Terjadi kesalahan saat menyimpan",
          color: "red",
        });
      }
    },
    [productData, selectedFiles, clusterId, dataImages]
  );

  return (
    <SimpleGridGlobal cols={1}>
      <LoadingGlobal visible={isLoadingImageData} />
      <Modal opened={opened} onClose={onClose} size="100%" yOffset="100px">
        <Formik
          enableReinitialize
          initialValues={getInitialValuesUpdateProduct(productData)}
          // initialValues={getInitialValuesUpdateProduct(productData, keepImageIds, originalKeepImageIds)}
          validationSchema={validationSchemaProduct}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => {
            // console.log("values", values);
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
                      value={values.type}
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

                  <UpdateImageField
                    existingImages={dataImages?.images}
                    onFilesChange={handleFilesChange}
                    onKeepIdsChange={handleKeepIdsChange}
                  />

                  <Group justify="flex-end" mt="md">
                    <Button variant="default" onClick={close} disabled={isLoadingUpdateProductData || isUploadingImage}>
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
