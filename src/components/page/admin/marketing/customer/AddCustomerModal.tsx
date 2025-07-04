"use client";

import React, { useCallback } from "react";
import { Modal, TextInput, Button, Group, Select, SimpleGrid, Divider, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form, FormikHelpers } from "formik";
import { showNotification } from "@mantine/notifications";
import ButtonAdd from "@/components/common/button/buttonAdd";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { useSubmitCustomerForm } from "@/api/customer/postDataCustomer";
import SelectProduct from "@/components/common/select/SelectProduct";
import { validationSchemaCustomer } from "@/utils/validation/customer-validation";
import { houseSaleStatuses, paymentMethods } from "@/constants/dictionary";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { getInitialValuesCreateCustomer } from "@/utils/initialValues/initialValuesCustomer";
import SelectEmployee from "@/components/common/select/SelectEmployee";

interface AddMarketingModalProps {
  companyId: string;
}

const AddCustomerModal = ({ companyId }: AddMarketingModalProps) => {
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

  const handleChangeCustomer = (field: keyof ICustomerCreate, value: any, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue(field, value);
  };

  return (
    <SimpleGridGlobal cols={1}>
      <ButtonAdd onClick={open} size="3.5rem" />

      <Modal opened={opened} onClose={close} size={"60%"} yOffset="100px">
        <Formik
          initialValues={getInitialValuesCreateCustomer(companyId)}
          validationSchema={validationSchemaCustomer}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => {
            // console.log("values", values);
            // console.log("error", errors);
            return (
              <SimpleGrid>
                <Form>
                  <SimpleGrid p="40px" spacing="md">
                    <Stack>
                      <Text fw={700} mb={10}>
                        Tambah Konsumen
                      </Text>
                    </Stack>

                    <Group grow>
                      <TextInput
                        error={touched.name && errors.name ? errors.name : undefined}
                        label="Nama Konsumen"
                        placeholder="Masukkan Nama Konsumen"
                        onChange={(e) => handleChangeCustomer("name", e.currentTarget.value, setFieldValue)}
                      />
                    </Group>
                    <TextInput
                      error={touched.address && errors.address ? errors.address : undefined}
                      label="Alamat Konsumen"
                      placeholder="Masukkan Alamat "
                      onChange={(e) => handleChangeCustomer("address", e.currentTarget.value, setFieldValue)}
                    />
                    <TextInput
                      error={touched.phone && errors.phone ? errors.phone : undefined}
                      label="Nomor Telepon"
                      placeholder="Masukkan Nomor Telepon"
                      value={values.phone}
                      onChange={(e) => {
                        const onlyNumbers = e.currentTarget.value.replace(/\D/g, "");
                        handleChangeCustomer("phone", onlyNumbers, setFieldValue);
                      }}
                    />

                    <Divider mt={20} />
                    <SelectProduct
                      value={values.home_id}
                      onChange={(value) => setFieldValue("home_id", value)}
                      error={touched.home_id && errors.home_id ? errors.home_id : undefined}
                    />
                    <TextInput
                      error={touched.product_unit && errors.product_unit ? errors.product_unit : undefined}
                      label="Unit"
                      placeholder="Masukkan Unit"
                      onChange={(e) => handleChangeCustomer("product_unit", e.currentTarget.value, setFieldValue)}
                    />

                    <Select
                      error={touched.status && errors.status ? errors.status : undefined}
                      label="Status"
                      data={houseSaleStatuses}
                      placeholder="Pilih Status"
                      clearable
                      searchable
                      onChange={(val) => handleChangeCustomer("status", val || "", setFieldValue)}
                    />
                    <Select
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
                    <TextInput
                      error={touched.name && errors.name ? errors.name : undefined}
                      label="Nama Bank"
                      placeholder="Masukan Nama Bank "
                      onChange={(e) => handleChangeCustomer("bank_name", e.currentTarget.value, setFieldValue)}
                    />
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

                    {/* <TextInput
                      error={touched.name && errors.name ? errors.name : undefined}
                      label="Nama Sales / Marketer"
                      placeholder="Masukkan Nama Sales"
                      onChange={(e) => handleChangeCustomer("marketer", e.currentTarget.value, setFieldValue)}
                    /> */}
                    <SelectEmployee
                      companyId={companyId}
                      label={"Nama Sales / Marketer"}
                      value={values?.marketer}
                      onChange={(value) => handleChangeCustomer("marketer", value, setFieldValue)}
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

export default AddCustomerModal;
