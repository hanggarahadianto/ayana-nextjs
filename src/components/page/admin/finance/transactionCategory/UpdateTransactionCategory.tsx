import React, { memo, useCallback } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, Stack, SimpleGrid } from "@mantine/core";
import { Form, Formik } from "formik";
import ButtonAdd from "@/components/common/button/buttonAdd";
import { initialValuesTransactionCategoryUpdate } from "@/utils/initialValues/initialValuesTransactionCategory";
import { validationSchemaTransactionCategory } from "@/utils/validation/transactionCategory-validation";
import SelectFinanceAccount from "@/components/common/select/SelectAccountType";
import { useModalStore } from "@/store/modalStore";
import { useUpdateTransactionCategory } from "@/api/transaction-category/updateDataTransactionCategory";
import LoadingGlobal from "@/styles/loading/loading-global";

interface UpdateTransactionCategoryModalProps {
  companyId?: string;
  initialValues: ITransactionCategoryUpdate;
}

const UpdateTransactionCategoryModal = ({ companyId }: UpdateTransactionCategoryModalProps) => {
  const { opened, modalName, modalData: initialData, closeModal } = useModalStore();

  const { mutate: updateData, isPending: isLoadingUpdateTransactionCategoryData } = useUpdateTransactionCategory();

  // Mock submit function - replace with your actual API call
  const handleSubmit = useCallback(
    (values: ITransactionCategoryUpdate, { setSubmitting }: any) => {
      const statusLabel = values.status === "paid" ? "TUNAI" : values.status === "unpaid" ? "TEMPO" : "";
      const combinedName = `${values.jenis_transaksi} ${values.name}${statusLabel ? ` (${statusLabel})` : ""}`.trim();

      const payload = {
        id: values.id,
        values: {
          ...values,
          name: combinedName,
          company_id: companyId || "",
        },
      };

      updateData(payload, {
        onSuccess: () => {
          closeModal;
          setSubmitting(false);
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
      <ButtonAdd onClick={open} size={"3.5rem"} />
      <LoadingGlobal visible={isLoadingUpdateTransactionCategoryData} />
      <Modal opened={opened} onClose={closeModal} size="lg" yOffset="100px" title="Tambah Kategori Transaksi Baru">
        <Formik
          initialValues={initialValuesTransactionCategoryUpdate(initialData)}
          validationSchema={validationSchemaTransactionCategory}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, handleBlur, isSubmitting }) => {
            // console.log("error", errors);
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
                          data={[
                            { value: "Penjualan", label: "Penjualan" },
                            { value: "Pinjaman", label: "Pinjaman" },
                            { value: "Pembelian", label: "Pembelian" },
                            { value: "Pengeluaran", label: "Pengeluaran" },
                            { value: "Piutang", label: "Piutang" },
                          ]}
                          value={values.jenis_transaksi}
                          onChange={(value) => setFieldValue("jenis_transaksi", value)}
                          onBlur={handleBlur}
                          error={touched.jenis_transaksi && errors.jenis_transaksi}
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
                      companyId={companyId}
                      onSelect={(selected) => {
                        setFieldValue("debit_account_id", selected?.id);
                        setFieldValue("debit_account_type", selected?.type);
                        setFieldValue("category", selected?.category);
                      }}
                      all={true}
                      label={"Tipe Akun Debit"}
                      error={touched.debit_account_id && errors.debit_account_id}
                    />
                    <SelectFinanceAccount
                      companyId={companyId}
                      onSelect={(selected) => {
                        setFieldValue("credit_account_id", selected?.id);
                        setFieldValue("credit_account_type", selected?.type);
                      }}
                      all={true}
                      label={"Tipe Akun Kredit"}
                      error={touched.credit_account_id && errors.credit_account_id}
                    />

                    <TextInput
                      label="Kategori "
                      error={touched.category && errors.category}
                      placeholder="Kategori"
                      value={values.category}
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
                      disabled={isLoadingUpdateTransactionCategoryData}
                      loading={isLoadingUpdateTransactionCategoryData}
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

export default memo(UpdateTransactionCategoryModal);
