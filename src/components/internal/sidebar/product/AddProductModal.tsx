import React, { useCallback, useMemo, useRef, useState } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, NumberInput, SimpleGrid, FileInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { initialValueProductCreate, validationSchemaProduct } from "../../../../lib/initialValues/initialValuesProduct";
import { useSubmitProductForm } from "@/api/products/postDataProduct";
import ButtonAdd from "@/lib/button/buttonAdd";
import { useSubmitInfoForm } from "@/api/info/postDataInfo";
import FormInfo from "./FormInfo";
import { debounce } from "lodash";
import { validationSchemaInfo } from "@/lib/initialValues/initialValuesInfo";
import { showNotification } from "@mantine/notifications";

const AddProductModal = React.memo(({ refetchProductData }: { refetchProductData: () => void }) => {
  console.log("🔄 AddProductModal Rerendered");
  const renderCount = useRef(0);
  renderCount.current += 1;

  console.log("🔄 Render Count:", renderCount.current);

  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: postDataProduct, isPending: isLoadingSubmitProductData } = useSubmitProductForm(refetchProductData, close);
  const { mutate: postDataInfo, isPending: isLoadingSubmitInfoData } = useSubmitInfoForm(refetchProductData, close);

  const formValuesRef = useRef<Record<keyof IProductCreate, string | number | File>>({
    title: "",
    location: "",
    type: "",
    content: "",
    address: "",
    bathroom: 0,
    bedroom: 0,
    square: 0,
    status: "",
    price: "",
    sequence: 0,
    quantity: 0,
    file: "",
  });

  console.log("FORM VALUES REF", formValuesRef.current);

  const debouncedUpdateFormikValue = useMemo(() => {
    return debounce((setFieldValue: any, field: keyof IProductCreate, value: any) => {
      setFieldValue(field, value);
    }, 300);
  }, []);

  const handleChangeProduct = useCallback(
    (field: keyof IProductCreate, value: string | number | File, setFieldValue: any) => {
      if (formValuesRef.current[field] !== value) {
        formValuesRef.current[field] = value;
        debouncedUpdateFormikValue(setFieldValue, field, value);
      }
    },
    [debouncedUpdateFormikValue]
  );

  const [debouncedInfos, setDebouncedInfos] = useState<IInfoCreate>({
    maps: "",
    start_price: 0,
    home_id: "",
    near_by: [{ name: "", distance: "" }],
  });

  console.log("DEBOUNCE INFO", debouncedInfos);

  const handleSubmit = useCallback(
    async (values: IProductCreate, { setSubmitting }: any) => {
      try {
        await validationSchemaInfo.validate(debouncedInfos, { abortEarly: false });

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
        formData.append("sequence", values.sequence ? values.sequence.toString() : "0");
        formData.append("type", values.type);

        if (values.file) {
          formData.append("file", values.file);
        }

        postDataProduct(formData, {
          onSuccess: (data) => {
            console.log("DATA PRODUCT", data);
            const productId = data.data?.id;
            if (!productId) {
              throw new Error("Product ID tidak valid.");
            }

            const updatedInfo = {
              ...debouncedInfos,
              home_id: productId,
            };

            postDataInfo(updatedInfo, {
              onError: () => {
                console.error("Gagal menyimpan data barang. Melakukan rollback...");
              },
            });
            showNotification({
              title: "Data Berhasil Dikirim",
              message: "",
              color: "green",
            });
            refetchProductData();
          },
          onError: (error) => {
            console.error("Gagal menyimpan Info:", error);
          },
        });

        // close();
      } catch (error: any) {
        if (error.inner) {
          error.inner.forEach((err: any) => {
            console.error("Validation Error:", err.path, err.message);
          });
        } else {
          console.error("Submission Error:", error.message);
        }
      } finally {
        setSubmitting(false);
      }
    },
    [postDataProduct, postDataInfo, debouncedInfos]
  );

  return (
    <>
      <ButtonAdd onClick={open} size={"3.5rem"} />
      <Modal opened={opened} onClose={close} size="xl" yOffset={"100px"}>
        <Formik initialValues={initialValueProductCreate} validationSchema={validationSchemaProduct} onSubmit={handleSubmit}>
          {({ values, errors, setFieldValue }) => {
            console.log("VALUES", values);
            console.log("error", errors);

            return (
              <Form>
                <SimpleGrid p={40}>
                  <Group>
                    <TextInput
                      label="Nama Produk"
                      placeholder="Masukan Nama Produk"
                      onChange={(e) => {
                        handleChangeProduct("title", e.currentTarget.value, setFieldValue);
                      }}
                      required
                    />

                    <Select
                      clearable
                      label="Nama Lokasi"
                      placeholder="Pilih Lokasi"
                      onChange={(e) => {
                        handleChangeProduct("location", e || "", setFieldValue);
                      }}
                      data={[
                        { value: "GAW", label: "GAW" },
                        { value: "ABW", label: "ABW" },
                      ]}
                    />

                    <Select
                      label="Tipe"
                      placeholder="Pilih Tipe"
                      onChange={(e) => {
                        handleChangeProduct("type", e || "", setFieldValue);
                      }}
                      data={[
                        { value: "32 / 60", label: "32 / 60" },
                        { value: "36 / 60", label: "36 / 60" },
                      ]}
                      required
                    />
                  </Group>

                  <TextInput
                    label="Alamat"
                    placeholder="Masukan Alamat"
                    onChange={(e) => {
                      handleChangeProduct("address", e.currentTarget.value, setFieldValue);
                    }}
                    required
                  />

                  <Textarea
                    label="Deskripsi"
                    placeholder="Masukan Deskripsi"
                    defaultValue={values.content}
                    onChange={(e) => {
                      handleChangeProduct("content", e.currentTarget.value, setFieldValue);
                    }}
                    required
                  />

                  <Group>
                    <NumberInput
                      label="Kamar Mandi"
                      hideControls
                      placeholder="Masukan Jumlah Kamar Mandi"
                      onChange={(value) => {
                        handleChangeProduct("bathroom", value as number, setFieldValue); // Pastikan value adalah number
                      }}
                      required
                    />
                    <NumberInput
                      label="Kamar Tidur"
                      hideControls
                      placeholder="Masukan Jumlah Kamar Tidur"
                      onChange={(value) => {
                        handleChangeProduct("bedroom", Number(value) || 0, setFieldValue); // Pastikan nilai angka
                      }}
                      required
                    />

                    <NumberInput
                      label="Luas Tanah"
                      hideControls
                      placeholder="Masukan Luas Tanah"
                      onChange={(value) => {
                        handleChangeProduct("square", Number(value) || 0, setFieldValue); // Pastikan nilai angka
                      }}
                      required
                    />
                  </Group>

                  <Group>
                    <Select
                      w={180}
                      label="Status"
                      placeholder="Pilih Status"
                      onChange={(e) => {
                        handleChangeProduct("status", e || "", setFieldValue);
                      }}
                      data={[
                        { value: "available", label: "Available" },
                        { value: "sold", label: "Sold" },
                      ]}
                      required
                    />

                    <NumberInput
                      label="Kuantitas"
                      hideControls
                      placeholder="Masukan Kuantitas"
                      onChange={(value) => {
                        handleChangeProduct("quantity", Number(value) || 0, setFieldValue); // Pastikan nilai angka
                      }}
                      required
                    />

                    <NumberInput
                      hideControls
                      label="Harga Unit"
                      placeholder="Masukan Harga Unit (Rp)"
                      value={typeof formValuesRef.current.price === "number" ? formValuesRef.current.price : undefined}
                      onChange={(value) => {
                        handleChangeProduct("price", Number(value) || "", setFieldValue);
                      }}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="Rp. "
                      required
                    />
                  </Group>

                  <FormInfo debouncedInfos={debouncedInfos} setDebouncedInfos={setDebouncedInfos} />

                  <Group>
                    <NumberInput
                      label="Urutan"
                      hideControls
                      placeholder="Masukan Urutan"
                      onChange={(value) => {
                        handleChangeProduct("sequence", value as number, setFieldValue); // Pastikan value adalah number
                      }}
                      required
                    />

                    <FileInput
                      w={200}
                      label="Upload Gambar"
                      accept="image/png,image/jpeg"
                      clearable
                      placeholder="Upload files"
                      onChange={(file) => setFieldValue("file", file)}
                      required
                    />
                  </Group>
                  <Group justify="flex-end" mt="md">
                    <Button onClick={close} variant="default">
                      Cancel
                    </Button>
                    <Button type="submit" loading={isLoadingSubmitProductData}>
                      Add Product
                    </Button>
                  </Group>
                </SimpleGrid>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
});

export default AddProductModal;
