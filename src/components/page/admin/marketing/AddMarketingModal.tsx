"use client";
import React, { useCallback } from "react";
import { Modal, TextInput, Button, Group, Select, NumberInput, SimpleGrid, Divider, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form, FormikHelpers } from "formik";
import { showNotification } from "@mantine/notifications";
import { statusOptions } from "@/constants/dictionary";
import ButtonAdd from "@/components/common/button/buttonAdd";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { initialValuesCustomer } from "@/utils/initialValues/initialValuesCustomer";
import { useSubmitCustomerForm } from "@/api/customer/postDataCustomer";
import SelectProduct from "@/components/common/select/SelectProduct";
import { validationSchemaCustomer } from "@/utils/validation/customer-validation";

const AddMarketingModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: postDataCustomer, isPending: isLoadingSubmitCustomerData } = useSubmitCustomerForm();

  const handleSubmit = useCallback(
    async (values: ICustomerCreate, { resetForm }: FormikHelpers<ICustomerCreate>) => {
      try {
        const payload = {
          ...values,
        };

        postDataCustomer(payload, {
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
      } catch (error) {
        console.error("Submit Error:", error);
      }
    },
    [postDataCustomer, close]
  );

  const handleChangeProduct = (field: keyof ICustomerCreate, value: any, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue(field, value);
  };

  return (
    <SimpleGridGlobal cols={1}>
      <ButtonAdd onClick={open} size="3.5rem" />

      <Modal opened={opened} onClose={close} size={"40%"} yOffset="100px">
        <Formik initialValues={initialValuesCustomer} validationSchema={validationSchemaCustomer} onSubmit={handleSubmit}>
          {({ values, errors, touched, setFieldValue }) => {
            // console.log("values", values);
            // console.log("error", errors);
            return (
              <SimpleGrid>
                <Form>
                  <SimpleGrid p="40px" spacing="md">
                    <Stack>
                      <Text fw={700} mb={40}>
                        Tambah Customer
                      </Text>
                    </Stack>

                    <Group grow>
                      <TextInput
                        error={touched.name && errors.name ? errors.name : undefined}
                        label="Nama Customer"
                        placeholder="Masukkan Nama Konsumen"
                        onChange={(e) => handleChangeProduct("name", e.currentTarget.value, setFieldValue)}
                      />
                    </Group>
                    <TextInput
                      error={touched.name && errors.name ? errors.name : undefined}
                      label="Alamat Konsumen"
                      placeholder="Masukkan Alamat "
                      onChange={(e) => handleChangeProduct("address", e.currentTarget.value, setFieldValue)}
                    />
                    <NumberInput
                      error={touched.phone && errors.phone ? errors.phone : undefined}
                      label="Nomor Telepon"
                      hideControls
                      placeholder="Masukkan Nomor Telepon"
                      onChange={(val) => handleChangeProduct("phone", val.toString() || 0, setFieldValue)}
                    />

                    <Divider mt={20} />
                    <SelectProduct value={values.home_id} onChange={(value) => setFieldValue("home_id", value)} />

                    <Select
                      error={touched.status && errors.status ? errors.status : undefined}
                      label="Status"
                      data={statusOptions}
                      placeholder="Pilih Status"
                      clearable
                      onChange={(val) => handleChangeProduct("status", val || "", setFieldValue)}
                    />

                    <Divider p={12} mt={16} />
                    <TextInput
                      error={touched.name && errors.name ? errors.name : undefined}
                      label="Nama Sales / Marketer"
                      placeholder="Masukkan Nama Sales"
                      onChange={(e) => handleChangeProduct("marketer", e.currentTarget.value, setFieldValue)}
                    />
                    <Divider p={12} mt={16} />

                    <Group justify="flex-end" mt="md">
                      <Button onClick={close} variant="default">
                        Batal
                      </Button>
                      <Button type="submit" loading={isLoadingSubmitCustomerData}>
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

export default AddMarketingModal;
