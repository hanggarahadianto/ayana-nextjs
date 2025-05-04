import React, { memo, useCallback } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, Stack, SimpleGrid, NumberInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import ButtonAdd from "@/components/common/button/buttonAdd";
import { initialValuesTransactionCategoryCreate } from "@/utils/initialValues/initialValuesTransactionCategory";
import { validationSchemaTransactionCategory } from "@/utils/validation/transactionCategory-validation";
import { useSubmitTransactionCategory } from "@/api/transaction-category/postDataTransactionCategory";
import SelectFinanceAccount from "@/components/common/select/SelectAccountType";

interface AddTransactionCategoryModalProps {
  refetchTransactionCategoryData: () => void;
  companyId?: string;
}

const AddTransactionCategoryModal = ({ refetchTransactionCategoryData, companyId }: AddTransactionCategoryModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  // console.log("KOMPANI ID", companyId);

  const { mutate: postData, isPending: isLoadingSubmitTransactionCategoryData } = useSubmitTransactionCategory(
    refetchTransactionCategoryData,
    close
  );

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
            return (
              <Form>
                <SimpleGrid p={20}>
                  <Stack gap={20}>
                    <TextInput
                      withAsterisk
                      label="Nama Transaksi"
                      placeholder="Contoh: Investor"
                      value={values.name}
                      onChange={(e) => setFieldValue("name", e.currentTarget.value)}
                      onBlur={handleBlur}
                      error={touched.name && errors.name}
                    />
                    <Select
                      withAsterisk
                      label="Tipe Transaksi"
                      placeholder="Pilih tipe transaksi"
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
                      companyId={companyId}
                      onSelect={(selected) => {
                        setFieldValue("debit_account_id", selected?.id);
                        setFieldValue("debit_account_type", selected?.type);
                        setFieldValue("category", selected?.category);
                      }}
                      all={true}
                      label={"Tipe Akun Debit"}
                    />
                    <SelectFinanceAccount
                      companyId={companyId}
                      onSelect={(selected) => {
                        setFieldValue("credit_account_id", selected?.id);
                        setFieldValue("credit_account_type", selected?.type);
                      }}
                      all={true}
                      label={"Tipe Akun Kredit"}
                    />

                    <TextInput label="Kategori " placeholder="Kategori" value={values.category} onBlur={handleBlur} readOnly />

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
