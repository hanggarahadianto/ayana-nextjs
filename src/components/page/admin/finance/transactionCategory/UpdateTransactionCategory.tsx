import React, { memo, useCallback } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, Stack, SimpleGrid, Text } from "@mantine/core";
import { Form, Formik } from "formik";
import { initialValuesTransactionCategoryUpdate } from "@/utils/initialValues/initialValuesTransactionCategory";
import { validationSchemaTransactionCategory } from "@/utils/validation/transactionCategory-validation";
import SelectFinanceAccount from "@/components/common/select/SelectAccountType";
import { useModalStore } from "@/store/modalStore";
import { useUpdateTransactionCategory } from "@/api/transaction-category/updateDataTransactionCategory";
import { transactionLabel } from "@/constants/dictionary";

interface UpdateTransactionCategoryModalProps {
  companyId?: string;
  initialValues: ITransactionCategoryUpdate;
}

const UpdateTransactionCategoryModal = ({ companyId }: UpdateTransactionCategoryModalProps) => {
  const { opened, modalName, modalData: initialData, closeModal } = useModalStore();

  // console.log("initial data", initialData);

  const { mutate: updateData, isPending } = useUpdateTransactionCategory();

  // Mock submit function - replace with your actual API call
  const handleSubmit = useCallback(
    (values: ITransactionCategoryUpdate, { setSubmitting }: any) => {
      const payload = {
        id: values.id,
        values: {
          ...values,
          company_id: companyId || "",
        },
      };

      updateData(payload, {
        onSuccess: () => {
          setSubmitting(false);
          closeModal();
        },
        onError: () => {
          setSubmitting(false);
        },
      });
    },
    [companyId]
  );

  if (modalName !== "editTransactionCategory" || !opened || !initialData) return null;

  return (
    <>
      <Modal opened={opened} onClose={closeModal} size="70%" yOffset="100px">
        <Formik
          initialValues={initialValuesTransactionCategoryUpdate(initialData)}
          validationSchema={validationSchemaTransactionCategory}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, handleBlur }) => {
            // console.log("values", values);
            // console.log("error", errors);
            return (
              <Form>
                <SimpleGrid p={20}>
                  <Text fw={600}>
                    Ubah Akun {initialData?.transaction_label} {initialData?.name}
                  </Text>
                  <Stack gap={20}>
                    <Select
                      clearable
                      withAsterisk
                      label="Status Pembayaran"
                      placeholder="Pilih Status Pembayaran"
                      data={[
                        { value: "paid", label: "Tunai" },
                        { value: "unpaid", label: "Tenor" },
                      ]}
                      value={values.status}
                      onChange={(value) => setFieldValue("status", value)}
                      onBlur={handleBlur}
                      error={touched.status && errors.status}
                    />

                    {values.status && (
                      <Group>
                        <Select
                          required
                          withAsterisk
                          label="Jenis Transaksi"
                          placeholder="Pilih Jenis Transaksi"
                          data={transactionLabel}
                          value={values.transaction_label}
                          onChange={(value) => setFieldValue("transaction_label", value)}
                          onBlur={handleBlur}
                          error={touched.transaction_label && errors.transaction_label}
                        />
                        <TextInput
                          w={"100%"}
                          withAsterisk
                          label="Nama Transaksi"
                          placeholder="Contoh: Investor"
                          value={values.name}
                          onChange={(e) => setFieldValue("name", e.currentTarget.value)}
                          onBlur={handleBlur}
                          error={touched.name && errors.name}
                        />
                      </Group>
                    )}

                    <Select
                      withAsterisk
                      label="Tipe Transaksi"
                      placeholder="Pilih Tipe Transaksi"
                      data={[
                        { value: "payin", label: "Pay In (Pemasukan)" },
                        { value: "payout", label: "Pay Out (Pengeluaran)" },
                      ]}
                      value={values.transaction_type}
                      onChange={(value) => setFieldValue("transaction_type", value)}
                      onBlur={handleBlur}
                      error={touched.transaction_type && errors.transaction_type}
                    />
                    <SelectFinanceAccount
                      value={values.debit_account_id}
                      companyId={companyId}
                      onSelect={(selected) => {
                        setFieldValue("debit_account_id", selected?.id);
                        setFieldValue("debit_account_type", selected?.type);
                        setFieldValue("debit_category", selected?.category);
                      }}
                      all={true}
                      label={"Tipe Akun Debit"}
                      error={touched.debit_account_id && errors.debit_account_id}
                    />
                    <SelectFinanceAccount
                      value={values.credit_account_id}
                      companyId={companyId}
                      onSelect={(selected) => {
                        setFieldValue("credit_account_id", selected?.id);
                        setFieldValue("credit_account_type", selected?.type);
                        setFieldValue("credit_category", selected?.category);
                      }}
                      all={true}
                      label={"Tipe Akun Kredit"}
                      error={touched.credit_account_id && errors.credit_account_id}
                    />

                    <TextInput
                      label="Debit Kategori "
                      error={touched.debit_category && errors.debit_category}
                      placeholder="Kategori"
                      value={values.debit_category}
                      onBlur={handleBlur}
                      readOnly
                    />
                    <TextInput
                      label="Kredit Kategori "
                      error={touched.credit_category && errors.credit_category}
                      placeholder="Kategori"
                      value={values.credit_category}
                      onBlur={handleBlur}
                      readOnly
                    />
                    <Textarea
                      label="Deskripsi"
                      placeholder="Deskripsi akun (opsional)"
                      value={values.description}
                      onChange={(e) => setFieldValue("description", e.currentTarget.value)}
                      onBlur={handleBlur}
                      error={touched.description && errors.description}
                    />
                  </Stack>

                  <Group justify="flex-end" mt="md">
                    <Button onClick={closeModal} variant="default" disabled={isPending}>
                      Batal
                    </Button>
                    <Button type="submit" disabled={isPending} loading={isPending}>
                      Ubah Transaksi kategori
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
};

export default memo(UpdateTransactionCategoryModal);
