import React, { memo, useCallback } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, Stack, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import ButtonAdd from "@/components/common/button/buttonAdd";
import { initialValuesTransactionCategoryCreate } from "@/utils/initialValues/initialValuesTransactionCategory";
import { validationSchemaTransactionCategory } from "@/utils/validation/transactionCategory-validation";
import { useSubmitTransactionCategory } from "@/api/transaction-category/postDataTransactionCategory";
import SelectFinanceAccount from "@/components/common/select/SelectAccountType";
import { transactionLabel } from "@/constants/dictionary";

interface AddTransactionCategoryModalProps {
  refetchTransactionCategoryData: () => void;
  companyId?: string;
}

const AddTransactionCategoryModal = ({ refetchTransactionCategoryData, companyId }: AddTransactionCategoryModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: postData, isPending: isLoadingSubmitTransactionCategoryData } = useSubmitTransactionCategory();

  // Mock submit function - replace with your actual API call
  const handleSubmit = useCallback(
    (values: ITransactionCategoryCreate, { setSubmitting }: any) => {
      const payload = {
        ...values,

        company_id: companyId || "",
      };

      postData(payload, {
        onSuccess: () => {
          refetchTransactionCategoryData();
          close();
          setSubmitting(false);
        },
        onError: () => {
          setSubmitting(false);
        },
      });
    },
    [companyId]
  );

  return (
    <>
      <ButtonAdd onClick={open} size={"3.5rem"} />

      <Modal opened={opened} onClose={close} size="lg" yOffset="100px" title="Tambah Kategori Transaksi Baru">
        <Formik
          initialValues={initialValuesTransactionCategoryCreate(companyId)}
          validationSchema={validationSchemaTransactionCategory}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, handleBlur, isSubmitting }) => {
            // console.log("error", errors);
            // console.log("values", values);
            return (
              <Form>
                <SimpleGrid p={20}>
                  <Stack gap={20}>
                    <Select
                      clearable
                      withAsterisk
                      label="Status Pembayaran"
                      placeholder="Pilih Status Pembayaran"
                      data={[
                        { value: "paid", label: "Tunai" },
                        { value: "unpaid", label: "Tempo" },
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
                      error={touched.debit_category && errors.credit_category}
                      placeholder="Kategori"
                      value={values.debit_category}
                      onBlur={handleBlur}
                      readOnly
                    />
                    <TextInput
                      label="Kredit Kategori "
                      error={touched.credit_category && errors.credit_category}
                      placeholder="Kredit Kategori"
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
                    <Button onClick={close} variant="default">
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoadingSubmitTransactionCategoryData}
                      loading={isLoadingSubmitTransactionCategoryData}
                    >
                      Tambah Transaksi kategori
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

export default memo(AddTransactionCategoryModal);
