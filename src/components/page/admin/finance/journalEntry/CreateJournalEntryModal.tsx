import React, { memo, useCallback } from "react";
import { Modal, Button, Group, Stack, SimpleGrid, TextInput, Textarea, InputWrapper, NumberInput, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form } from "formik";
import { IconCalendar } from "@tabler/icons-react";
import ButtonAdd from "@/components/common/button/buttonAdd";
import SelectFinanceTransactionCategory from "@/components/common/select/SelectTransactiontCategory";
import { initialValuesJournalEntry } from "@/utils/initialValues/initialValuesJournalEntry";
import { validationSchemaJournalEntry } from "@/utils/validation/journalEntry-validation";
import { useSubmitJournalEntry } from "@/api/finance/postDataJournalEntry";
import { useQueryClient } from "@tanstack/react-query";

interface CreateJournalEntryModalProps {
  transactionType: string;
  companyId?: string;
}

const CreateJournalEntryModal = ({ transactionType, companyId }: CreateJournalEntryModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();

  const { mutate: postData, isPending: isLoadingSubmitJournalEntry } = useSubmitJournalEntry(close);
  const handleSubmit = useCallback(
    (values: IJournalEntryCreate, { setSubmitting }: any) => {
      const modifiedValues = {
        ...values,
        date_inputed: values.date_inputed || null,
        due_date: values.due_date || null,
        transactionType,
      };

      postData(modifiedValues, {
        onSuccess: async () => {
          try {
            await Promise.all([
              queryClient.refetchQueries({
                queryKey: ["getCashSummaryData", companyId],
                exact: false,
              }),
              queryClient.refetchQueries({
                queryKey: ["getExpenseSummaryData", companyId],
                exact: false,
              }),
              queryClient.refetchQueries({
                queryKey: ["getOutstandingDebtByCompanyId", companyId],
                exact: false,
              }),
            ]);

            close(); // Tutup modal setelah sukses
          } catch (e) {
            console.error("Error in onSuccess handler:", e);
          } finally {
            setSubmitting(false); // Stop loading state
          }
        },
      });
    },
    [transactionType, companyId, postData, queryClient, close]
  );

  const handleInputChange = (setFieldValue: any, field: string, value: any) => {
    // Jika field adalah date_inputed atau due_date, ubah nilai kosong menjadi null
    if (field === "date_inputed" || field === "due_date") {
      setFieldValue(field, value ? value : null);
    } else {
      setFieldValue(field, value);
    }
  };

  return (
    <>
      <ButtonAdd onClick={open} size={"3.5rem"} />

      <Modal opened={opened} onClose={close} size="lg" yOffset="100px">
        <Formik
          initialValues={initialValuesJournalEntry(companyId, transactionType)}
          validationSchema={validationSchemaJournalEntry}
          validateOnBlur={false}
          enableReinitialize
          validateOnChange
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, handleBlur }) => {
            console.log("values", values);
            console.log("error", errors);
            return (
              <Form>
                <SimpleGrid p={20}>
                  <Stack gap={20}>
                    <SelectFinanceTransactionCategory
                      companyId={companyId ?? undefined}
                      onSelect={(selected) => {
                        setFieldValue("description", selected.description);
                        setFieldValue("transaction_category_id", selected.id);
                      }}
                      label={"Kategori Transaksi"}
                      transactionType={transactionType ?? undefined}
                    />

                    <TextInput
                      withAsterisk
                      label="No Invoice"
                      placeholder="Contoh: INV/001"
                      value={values.invoice}
                      onChange={(e) => setFieldValue("invoice", e.currentTarget.value)}
                      onBlur={handleBlur}
                      error={touched.invoice && errors.invoice}
                    />

                    <TextInput
                      withAsterisk
                      label="Partner"
                      placeholder="Contoh: Pinjaman Bank BCA"
                      value={values.partner}
                      onChange={(e) => setFieldValue("partner", e.currentTarget.value.toLocaleUpperCase())}
                      onBlur={handleBlur}
                      error={touched.partner && errors.partner}
                    />
                    <TextInput
                      label="Nominal"
                      error={touched.amount && errors.amount ? errors.amount : undefined}
                      placeholder="Masukan Nominal"
                      value={values.amount ? `Rp. ${values.amount.toLocaleString("id-ID")}` : ""}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, "");
                        const numericValue = Number(rawValue) || 0;
                        setFieldValue("amount", numericValue);
                      }}
                    />

                    <NumberInput
                      hideControls
                      label="Total Cicilan"
                      error={touched.installment && errors.installment ? errors.installment : undefined}
                      placeholder="Contoh : 3 X"
                      value={values.installment && values.installment !== 0 ? values.installment : ""}
                      onChange={(val) => {
                        // Pastikan nilai yang disimpan selalu number
                        const numValue = Number(val);
                        setFieldValue("installment", isNaN(numValue) ? "" : numValue);
                      }}
                      suffix=" x"
                    />

                    <Group grow>
                      <DatePickerInput
                        label="Tanggal Uang Masuk"
                        placeholder="Tanggal"
                        locale="id"
                        clearable
                        radius="sm"
                        valueFormat="DD MMMM YYYY"
                        rightSection={<IconCalendar size={18} />}
                        onChange={(date) => handleInputChange(setFieldValue, "date_inputed", date ? date.toISOString() : null)}
                        onBlur={handleBlur}
                        error={touched.date_inputed && errors.date_inputed}
                      />

                      <DatePickerInput
                        label="Jatuh Tempo"
                        placeholder="Jatuh Tempo"
                        locale="id"
                        clearable
                        radius="sm"
                        valueFormat="DD MMMM YYYY"
                        rightSection={<IconCalendar size={18} />}
                        onChange={(date) => handleInputChange(setFieldValue, "due_date", date ? date.toISOString() : null)}
                        onBlur={handleBlur}
                        error={touched.due_date && errors.due_date}
                      />
                    </Group>
                    {transactionType !== "payin" && (
                      <Select
                        clearable
                        withAsterisk
                        label="Status Pembayaran"
                        placeholder="Pilih Status Pembayaran"
                        data={[
                          { value: "paid", label: "Tunai" },
                          { value: "unpaid", label: "Tempo" },
                        ]}
                        onChange={(value: any) => {
                          setFieldValue("status", value);
                          setFieldValue("is_repaid", true);
                        }}
                        onBlur={handleBlur}
                        error={touched.status && errors.status}
                      />
                    )}

                    <Textarea
                      label="Keterangan"
                      placeholder="Masukkan Keterangan"
                      value={values.note?.toUpperCase() || ""}
                      onChange={(e) => setFieldValue("note", e.currentTarget.value.toUpperCase())}
                    />
                  </Stack>

                  <Group justify="flex-end" mt="md">
                    <Button onClick={close} variant="default">
                      Cancel
                    </Button>
                    <Button type="submit" loading={isLoadingSubmitJournalEntry} disabled={isLoadingSubmitJournalEntry}>
                      Tambah Transaksi
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

export default memo(CreateJournalEntryModal);
