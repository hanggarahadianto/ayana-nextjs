import React, { memo, useCallback } from "react";
import { Modal, Button, Group, Stack, SimpleGrid, TextInput, Textarea, InputWrapper } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form } from "formik";
import { IconCalendar } from "@tabler/icons-react";
import ButtonAdd from "@/components/common/button/buttonAdd";
import SelectFinanceTransactionCategory from "@/components/common/select/SelectTransactiontCategory";
import { initialValuesJournalEntry } from "@/utils/initialValues/initialValuesJournalEntry";
import { validationSchemaJournalEntry } from "@/utils/validation/journalEntry-validation";

interface AddJournalEntryModalProps {
  transactionType: string | null;
  companyId: string | null;
}

const AddJournalEntryModal = ({ transactionType, companyId }: AddJournalEntryModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  // const { mutate: postData, isPending: isLoadingSubmitAccountData } = useSubmitPayoutForm(close);

  const handleSubmit = useCallback(
    (values: IJournalEntryCreate, { setSubmitting }: any) => {
      const payload = {
        ...values,
        // payment_date: values.payment_date || "",
        transactionType: transactionType ?? "",
        company_id: companyId ?? "",
      };
      // postData(payload);
      setSubmitting(false);
    },
    [transactionType, companyId]
    // [companyCode, companyId, postData]
  );

  const handleInputChange = (setFieldValue: any, field: string, value: any) => {
    setFieldValue(field, value);
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
            return (
              <Form>
                <SimpleGrid p={20}>
                  <Stack gap={20}>
                    <SelectFinanceTransactionCategory
                      companyId={companyId ?? ""}
                      onSelect={(selected) => {
                        // setFieldValue("debit_account_id", selected.debit_account_id);
                        // setFieldValue("credit_account_id", selected.credit_account_id);
                        // setFieldValue("category", selected.name);
                        setFieldValue("transaction_category_id", selected.id);
                      }}
                      label={"Kategori Transaksi"}
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

                    {/* <TextInput
                      withAsterisk
                      label="Mitra"
                      placeholder="Masukkan Mitra"
                      value={values.partner || ""}
                      onChange={(e) => setFieldValue("mitra", e.currentTarget.value.toUpperCase())}
                      error={touched.partner && errors.partner ? errors.partner : undefined}
                    /> */}

                    {/* <TextInput
                       error={touched.nominal && errors.nominal ? errors.nominal : undefined}
                        placeholder="Masukan Jumlah"
                        value={values.nominal ? `Rp. ${values.nominal.toLocaleString("id-ID")}` : ""}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/\D/g, "");
                          const numericValue = Number(rawValue) || 0;
                          setFieldValue("nominal", numericValue);
                        }}
                      />
       */}

                    <Group grow>
                      <DatePickerInput
                        label="Tanggal Uang Masuk"
                        placeholder="Tanggal"
                        locale="id"
                        clearable
                        radius="sm"
                        valueFormat="DD MMMM YYYY"
                        rightSection={<IconCalendar size={18} />}
                        onChange={(date) => handleInputChange(setFieldValue, "date_inputed", date?.toISOString() || "")}
                        onBlur={handleBlur}
                        error={touched.date_inputed && errors.date_inputed}
                      />

                      {/* <DatePickerInput
                        label="Jatuh Tempo"
                        placeholder="Jatuh Tempo"
                        locale="id"
                        clearable
                        radius="sm"
                        valueFormat="DD MMMM YYYY"
                        rightSection={<IconCalendar size={18} />}
                        onChange={(date) => handleInputChange(setFieldValue, "due_date", date?.toISOString() || "")}
                        onBlur={handleBlur}
                        error={touched.due_date && errors.due_date}
                      /> */}
                    </Group>

                    {/* <Textarea
                      label="Keterangan"
                      placeholder="Masukkan Keterangan"
                      value={values.note?.toUpperCase() || ""}
                      onChange={(e) => setFieldValue("note", e.currentTarget.value.toUpperCase())}
                    /> */}
                  </Stack>

                  <Group justify="flex-end" mt="md">
                    <Button onClick={close} variant="default">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      // loading={isLoadingSubmitAccountData}
                    >
                      Tambah Payout
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

export default memo(AddJournalEntryModal);
