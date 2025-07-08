"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Modal, TextInput, Button, Group, Select, SimpleGrid, Divider, Text, Stack, Switch, Card } from "@mantine/core";
import { Formik, Form, FormikHelpers } from "formik";
import { houseSaleStatuses, paymentMethods } from "@/constants/dictionary";
import { getInitialValuesUpdateCustomer } from "@/utils/initialValues/initialValuesCustomer";
import { validationSchemaCustomer } from "@/utils/validation/customer-validation";
import { useUpdateCustomerData } from "@/api/customer/updateCustomer";
import SelectProduct from "@/components/common/select/SelectProduct";
import { useModalStore } from "@/store/modalStore";
import { IconCalendar, IconEdit, IconX } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import SelectEmployee from "@/components/common/select/SelectEmployee";

interface EditCustomerModalProps {
  companyId: string;
  initialData: ICustomerUpdate;
}

const EditCustomerModal: React.FC<EditCustomerModalProps> = ({ companyId }) => {
  const { opened, modalName, modalData: initialData, closeModal } = useModalStore();
  const [isAgent, setIsAgent] = useState(false);
  const [ubahMarketer, setUbahMarketer] = useState(false);

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
    setFieldValue(field, value);
  };

  if (modalName !== "editCustomer" || !opened || !initialData) return null;

  return (
    <Modal opened={opened} onClose={closeModal} size="70%" yOffset="100px">
      <Formik<ICustomerUpdateWithMarketer>
        initialValues={getInitialValuesUpdateCustomer(companyId, initialData)}
        validationSchema={validationSchemaCustomer}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue }) => {
          // console.log("marketer name ya", values.marketer);
          // console.log("values", values);
          // console.log("error", errors);
          useEffect(() => {
            if (opened && modalName === "editCustomer" && initialData?.marketer) {
              setIsAgent(initialData.marketer.is_agent ?? false);
            }
          }, [opened, modalName, initialData?.marketer]);

          return (
            <SimpleGrid>
              <Form>
                <SimpleGrid p="40px" spacing="md">
                  <Stack>
                    <Text fw={700}>Ubah Konsumen {initialData?.name}</Text>
                  </Stack>

                  <Stack>
                    <TextInput
                      value={values?.name}
                      error={touched.name && errors.name ? errors.name : undefined}
                      label="Nama Customer"
                      placeholder="Masukkan Nama Konsumen"
                      onChange={(e) => handleChangeCustomer("name", e.currentTarget.value, setFieldValue)}
                    />
                    <TextInput
                      value={values.address}
                      error={touched.address && errors.address ? errors.address : undefined}
                      label="Alamat Konsumen"
                      placeholder="Masukkan Alamat"
                      onChange={(e) => handleChangeCustomer("address", e.currentTarget.value, setFieldValue)}
                    />
                    <Divider mt={20} />
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
                  </Stack>
                  <Stack>
                    <SelectProduct
                      error={touched.home_id && errors.home_id ? errors.home_id : undefined}
                      value={values.home_id}
                      onChange={(value) => setFieldValue("home_id", value)}
                    />
                    <TextInput
                      error={touched.product_unit && errors.product_unit ? errors.product_unit : undefined}
                      label="Unit"
                      value={values.product_unit || ""}
                      placeholder="Masukkan Unit"
                      onChange={(e) => handleChangeCustomer("product_unit", e.currentTarget.value, setFieldValue)}
                    />
                    <Select
                      value={values?.status}
                      error={touched.status && errors.status ? errors.status : undefined}
                      label="Status"
                      data={houseSaleStatuses}
                      placeholder="Pilih Status"
                      clearable
                      onChange={(val) => handleChangeCustomer("status", val || "", setFieldValue)}
                    />
                    <Select
                      value={values.payment_method}
                      error={touched.payment_method && errors.payment_method ? errors.payment_method : undefined}
                      label="Metode Pembayaran"
                      data={paymentMethods}
                      placeholder="Pilih Metode Pembayaran"
                      clearable
                      onChange={(val) => handleChangeCustomer("payment_method", val || "", setFieldValue)}
                    />
                    <TextInput
                      error={touched.amount && errors?.amount}
                      label="Nominal"
                      placeholder="Masukkan Nominal"
                      value={values.amount ? `Rp. ${values.amount.toLocaleString("id-ID")}` : ""}
                      onChange={(e) => {
                        const raw = e.currentTarget.value.replace(/\D/g, "");
                        const numeric = Number(raw) || 0;
                        handleChangeCustomer("amount", numeric, setFieldValue);
                      }}
                    />
                  </Stack>
                  <Divider p={12} mt={16} />
                  <DatePickerInput
                    error={touched.date_inputed && errors?.date_inputed}
                    label="Tanggal Transaksi"
                    placeholder="Tanggal"
                    locale="id"
                    clearable
                    radius="sm"
                    valueFormat="DD MMMM YYYY"
                    rightSection={<IconCalendar size={18} />}
                    value={values.date_inputed ? new Date(values.date_inputed) : null}
                    onChange={(date) => handleChangeCustomer("date_inputed", date ? date.toISOString() : null, setFieldValue)}
                  />

                  <Card>
                    <Group w="full" justify="space-between">
                      <TextInput value={values?.marketer?.name} readOnly label="Nama Marketer" />
                      <Button
                        color={ubahMarketer ? "red" : "blue"}
                        leftSection={ubahMarketer ? <IconX size={16} /> : <IconEdit size={16} />}
                        onClick={() => setUbahMarketer((prev) => !prev)}
                      >
                        {ubahMarketer ? "Batal Ubah Marketer" : "Ubah Marketer"}
                      </Button>
                    </Group>
                    <Stack mt={32}>
                      {ubahMarketer && (
                        <>
                          <Stack w={60}>
                            <Switch
                              label={isAgent ? "Agen" : "Karyawan"}
                              checked={isAgent}
                              onChange={(e) => {
                                setFieldValue("marketer_id", null);
                                setIsAgent(e.currentTarget.checked);
                              }}
                              color="teal"
                            />
                          </Stack>

                          <SelectEmployee
                            isAgent={isAgent}
                            companyId={companyId}
                            label="Nama Sales / Marketer"
                            value={values.marketer_id}
                            onChange={(value) => handleChangeCustomer("marketer_id", value, setFieldValue)}
                            error={values.marketer_id && errors?.marketer_id}
                          />
                        </>
                      )}
                    </Stack>
                  </Card>

                  <Divider p={12} mt={16} />
                  <Group justify="flex-end" mt="md">
                    <Button onClick={closeModal} variant="default">
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
