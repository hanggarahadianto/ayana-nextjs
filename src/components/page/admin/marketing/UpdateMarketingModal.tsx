"use client";
import React, { useCallback } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, NumberInput, SimpleGrid, Divider, Text, Stack } from "@mantine/core";
import { Formik, Form, FormikHelpers } from "formik";
import { availabilityOptions, statusOptions } from "@/constants/dictionary";
import { getInitialValuesUpdateCustomer } from "@/utils/initialValues/initialValuesCustomer";
import { validationSchemaCustomer } from "@/utils/validation/customer-validation";
import { useUpdateCustomerData } from "@/api/customer/updateCustomer";
import SelectProduct from "@/components/common/select/SelectProduct";
import { useModalStore } from "@/store/modalStore";

interface EditCustomerModalProps {
  initialData: ICustomerUpdate;
}

const EditCustomerModal: React.FC<EditCustomerModalProps> = () => {
  const { opened, modalName, modalData: initialData, closeModal } = useModalStore();
  //   console.log("MODAL DATA", initialData);

  const { mutate: updateCustomer, isPending: isLoadingUpdateCustomer } = useUpdateCustomerData(closeModal);

  const handleSubmit = useCallback(
    async (values: ICustomerUpdate, { resetForm }: FormikHelpers<ICustomerUpdate>) => {
      try {
        updateCustomer({ ...values, id: initialData.id });
      } catch (error: any) {
        console.error("Update Error:", error);
      }
    },
    [updateCustomer, closeModal, initialData]
  );

  const handleChangeCustomer = (field: keyof ICustomerCreate, value: any, setFieldValue: (field: string, value: any) => void) => {
    console.log(`handleChangeCustomer: field=${field}, value=${value}`);
    setFieldValue(field, value);
  };

  if (modalName !== "editCustomer" || !opened || !initialData) return null;

  return (
    <Modal opened={opened} onClose={closeModal} size="70%" yOffset="100px">
      <Formik
        initialValues={getInitialValuesUpdateCustomer(initialData)}
        validationSchema={validationSchemaCustomer}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue }) => {
          //   console.log("values", values);
          return (
            <SimpleGrid>
              <Form>
                <SimpleGrid p="40px" spacing="md">
                  <Stack>
                    <Text fw={700} mb={40}>
                      Ubah Konsumen {initialData?.name}
                    </Text>
                  </Stack>

                  <Group grow>
                    <TextInput
                      value={values?.name}
                      error={touched.name && errors.name ? errors.name : undefined}
                      label="Nama Customer"
                      placeholder="Masukkan Nama Konsumen"
                      onChange={(e) => handleChangeCustomer("name", e.currentTarget.value, setFieldValue)}
                    />
                  </Group>
                  <TextInput
                    value={values.address}
                    error={touched.address && errors.address ? errors.address : undefined}
                    label="Alamat Konsumen"
                    placeholder="Masukkan Alamat"
                    onChange={(e) => handleChangeCustomer("address", e.currentTarget.value, setFieldValue)}
                  />

                  <TextInput
                    value={values.phone}
                    error={touched.phone && errors.phone ? errors.phone : undefined}
                    label="Nomor Telepon"
                    placeholder="Masukkan Nomor Telepon"
                    type="tel"
                    onChange={(e) => {
                      const input = e.currentTarget.value;
                      const onlyDigits = input.replace(/\D/g, ""); // hanya angka
                      handleChangeCustomer("phone", onlyDigits, setFieldValue);
                    }}
                    inputMode="numeric" // muncul keypad angka di mobile
                    maxLength={15} // opsional: batasi panjang input
                  />

                  <Divider mt={20} />
                  <SelectProduct value={values.home_id} onChange={(value) => setFieldValue("home_id", value)} />

                  <Select
                    value={values.status}
                    error={touched.status && errors.status ? errors.status : undefined}
                    label="Status"
                    data={statusOptions}
                    placeholder="Pilih Status"
                    clearable
                    onChange={(val) => handleChangeCustomer("status", val || "", setFieldValue)}
                  />

                  <Divider p={12} mt={16} />

                  <TextInput
                    value={values.marketer}
                    error={touched.marketer && errors.marketer ? errors.marketer : undefined}
                    label="Nama Sales / Marketer"
                    placeholder="Masukkan Nama Sales"
                    onChange={(e) => handleChangeCustomer("marketer", e.currentTarget.value, setFieldValue)}
                  />
                  <Divider p={12} mt={16} />

                  <Group justify="flex-end" mt="md">
                    <Button onClick={close} variant="default">
                      Batal
                    </Button>
                    <Button type="submit" loading={isLoadingUpdateCustomer}>
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
  );
};

export default EditCustomerModal;
