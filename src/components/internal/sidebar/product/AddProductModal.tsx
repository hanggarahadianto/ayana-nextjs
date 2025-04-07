import React, { useCallback, useMemo, useRef, useState } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, NumberInput, SimpleGrid, FileInput, InputWrapper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { initialValueProductCreate, validationSchemaProduct } from "../../../../lib/initialValues/initialValuesProduct";
import { useSubmitProductForm } from "@/api/products/postDataProduct";
import ButtonAdd from "@/lib/button/buttonAdd";
import { useSubmitInfoForm } from "@/api/info/postDataInfo";

import { debounce } from "lodash";
import { showNotification } from "@mantine/notifications";
import { validateInfos } from "@/lib/validation/info-validation";
import { availabilityOptions, locationOptions, typeOptions } from "@/lib/dictionary";
import FormCreateInfo from "./FormCreateInfo";

const AddProductModal = React.memo(({ refetchProductData }: { refetchProductData: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: postDataProduct, isPending: isLoadingSubmitProductData } = useSubmitProductForm(refetchProductData, close);
  const { mutate: postDataInfo, isPending: isLoadingSubmitInfoData } = useSubmitInfoForm(refetchProductData, close);

  const formValuesRef = useRef<Record<keyof IProductCreate, any>>(
    Object.fromEntries(
      Object.keys(initialValueProductCreate).map((key) => [key, initialValueProductCreate[key as keyof IProductCreate]])
    ) as Record<keyof IProductCreate, string | number | File>
  );

  console.log("FORM VALUES REF", formValuesRef.current);

  const debouncedUpdateFormikValue = useMemo(() => {
    return debounce((setFieldValue: any, field: keyof IProductCreate, value: any) => {
      setFieldValue(field, value);
    }, 100);
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

  const [errorsInfo, setErrorsInfo] = useState<{ [key: string]: any }>({});

  const handleSubmit = useCallback(
    async (values: IProductCreate, { setSubmitting }: any) => {
      try {
        await validateInfos(debouncedInfos, undefined, setErrorsInfo);

        if (Object.keys(errorsInfo).length > 0) {
          console.warn("Masih ada error dalam form:", errorsInfo);
          setSubmitting(false);
          return;
        }

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
              onSuccess: () => {
                // ✅ Reset debouncedInfos setelah sukses
                setDebouncedInfos({
                  maps: "",
                  start_price: 0,
                  home_id: "",
                  near_by: [{ name: "", distance: "" }],
                });

                refetchProductData();
                // close();
              },
            });
            showNotification({
              title: "Data Berhasil Dikirim",
              message: "",
              color: "green",
            });
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
          {({ values, errors, setFieldValue, setErrors }) => {
            console.log("VALUES", values);
            console.log("error", errors);

            const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

            const handleManualSubmit = () => {
              setIsSubmitAttempted(true);
              validateInfos(debouncedInfos, undefined, setErrorsInfo);
              validationSchemaProduct.validate(values, { abortEarly: false }).catch((err) => {
                const validationErrors: { [key: string]: string } = {};
                err.inner.forEach((error: any) => {
                  validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
              });
            };

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
                      error={isSubmitAttempted && errors.title}
                    />

                    <Select
                      clearable
                      label="Nama Lokasi"
                      placeholder="Pilih Lokasi"
                      onChange={(e) => {
                        handleChangeProduct("location", e || "", setFieldValue);
                      }}
                      data={locationOptions}
                    />

                    <Select
                      label="Tipe"
                      placeholder="Pilih Tipe"
                      onChange={(e) => {
                        handleChangeProduct("type", e || "", setFieldValue);
                      }}
                      data={typeOptions}
                      required
                      error={isSubmitAttempted && errors.type}
                    />
                  </Group>

                  <TextInput
                    label="Alamat"
                    placeholder="Masukan Alamat"
                    onChange={(e) => {
                      handleChangeProduct("address", e.currentTarget.value, setFieldValue);
                    }}
                    required
                    error={isSubmitAttempted && errors.address}
                  />

                  <Textarea
                    label="Deskripsi"
                    placeholder="Masukan Deskripsi"
                    defaultValue={values.content}
                    onChange={(e) => {
                      handleChangeProduct("content", e.currentTarget.value, setFieldValue);
                    }}
                    required
                    error={isSubmitAttempted && errors.content}
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
                      error={isSubmitAttempted && errors.bathroom}
                    />
                    <NumberInput
                      label="Kamar Tidur"
                      hideControls
                      placeholder="Masukan Jumlah Kamar Tidur"
                      onChange={(value) => {
                        handleChangeProduct("bedroom", Number(value) || 0, setFieldValue); // Pastikan nilai angka
                      }}
                      required
                      error={isSubmitAttempted && errors.bedroom}
                    />

                    <NumberInput
                      label="Luas Tanah"
                      hideControls
                      placeholder="Masukan Luas Tanah"
                      onChange={(value) => {
                        handleChangeProduct("square", Number(value) || 0, setFieldValue); // Pastikan nilai angka
                      }}
                      required
                      error={isSubmitAttempted && errors.square}
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
                      required
                      error={isSubmitAttempted && errors.status}
                      data={availabilityOptions}
                    />

                    <NumberInput
                      label="Kuantitas"
                      hideControls
                      placeholder="Masukan Kuantitas"
                      onChange={(value) => {
                        handleChangeProduct("quantity", Number(value) || 0, setFieldValue); // Pastikan nilai angka
                      }}
                      required
                      error={isSubmitAttempted && errors.quantity}
                    />

                    <NumberInput
                      hideControls
                      label="Harga Awal"
                      placeholder="Masukan Harga Awal (Rp)"
                      value={
                        typeof formValuesRef.current.price
                          ? `Rp. ${Number(typeof formValuesRef.current.price).toLocaleString("id-ID")}`
                          : ""
                      }
                      onChange={(value) => {
                        handleChangeProduct("price", Number(value) || "", setFieldValue);
                      }}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="Rp. "
                      required
                      error={isSubmitAttempted && errors.price}
                    />
                  </Group>

                  <FormCreateInfo
                    debouncedInfos={debouncedInfos}
                    setDebouncedInfos={setDebouncedInfos}
                    isSubmitAttempted={isSubmitAttempted}
                    errorInfo={errorsInfo}
                    setErrorsInfo={setErrorsInfo}
                  />

                  <Group>
                    <NumberInput
                      label="Urutan"
                      hideControls
                      placeholder="Masukan Urutan"
                      onChange={(value) => {
                        handleChangeProduct("sequence", value as number, setFieldValue); // Pastikan value adalah number
                      }}
                      required
                      error={isSubmitAttempted && errors.sequence}
                    />

                    <FileInput
                      w={200}
                      label="Upload Gambar"
                      accept="image/png,image/jpeg"
                      clearable
                      placeholder="Upload files"
                      onChange={(file) => setFieldValue("file", file)}
                      required
                      error={isSubmitAttempted && errors.file}
                    />
                  </Group>
                  <Group justify="flex-end" mt="md">
                    <Button onClick={close} variant="default">
                      Cancel
                    </Button>
                    <Button type="submit" onClick={handleManualSubmit} loading={isLoadingSubmitProductData || isLoadingSubmitInfoData}>
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
