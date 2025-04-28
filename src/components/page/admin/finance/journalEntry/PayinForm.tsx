import React, { memo, useCallback } from "react";
import { Stack, Group, TextInput, NumberInput, Textarea, Button, SimpleGrid } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconTrash } from "@tabler/icons-react";
import { useFormikContext, FieldArray } from "formik";
import SelectFinanceTransactionCategory from "@/components/common/select/SelectTransactiontCategory";
import ButtonAdd from "@/components/common/button/buttonAdd";

const PayinForm = ({ transactionType, companyId }: { transactionType: string; companyId?: string }) => {
  const { values, setFieldValue, errors, touched, handleBlur } = useFormikContext<any>();

  const handleJournalChange = useCallback(
    (index: number, field: keyof IJournalEntryCreate, value: any) => {
      setFieldValue(`journalEntries.${index}.${field}`, value);
    },
    [setFieldValue]
  );

  const addJournalField = useCallback(() => {
    setFieldValue("journalEntries", [
      ...values.journalEntries,
      {
        amount: 0,
        date_inputed: "", // Tanggal input default
        description: "",
        due_date: null,
        installment: 0,
        invoice: "",
        is_repaid: false,
        note: "",
        partner: "",
        status: null, // Status default
        transaction_category_id: "", // ID kategori transaksi default
        transaction_type: "payin", // Tipe transaksi
      },
    ]);
  }, [setFieldValue, values.journalEntries]);

  const deleteJournalField = useCallback(
    (index: number) => {
      const updated = values.journalEntries.filter((_: any, idx: number) => idx !== index);
      setFieldValue("journalEntries", updated);
    },
    [setFieldValue, values.journalEntries]
  );

  return (
    <FieldArray name="journalEntries">
      {() => (
        <Stack gap="xl">
          {values?.journalEntries?.map((_: any, index: number) => (
            <SimpleGrid key={index} p={20} spacing="md">
              {index === 0 && (
                <Stack align="flex-end" justify="space-between" style={{ width: "100%" }}>
                  <ButtonAdd onClick={addJournalField} size="3.5rem" />
                </Stack>
              )}

              <Group justify="space-between" align="flex-start">
                <Stack w="100%" gap="md">
                  <SelectFinanceTransactionCategory
                    companyId={companyId}
                    transactionType={transactionType}
                    label="Kategori Transaksi"
                    onSelect={(selected) => {
                      handleJournalChange(index, "description", selected.description);
                      handleJournalChange(index, "transaction_category_id", selected.id);
                    }}
                  />
                  <Group w="100%" grow>
                    <TextInput
                      withAsterisk
                      label="No Invoice"
                      placeholder="Contoh: INV/001"
                      value={values.journalEntries[index].invoice}
                      onChange={(e) => handleJournalChange(index, "invoice", e.currentTarget.value)}
                      onBlur={handleBlur}
                      error={touched.journalEntries?.[index]?.invoice && errors.journalEntries?.[index]?.invoice}
                    />

                    <TextInput
                      withAsterisk
                      label="Partner"
                      placeholder="Contoh: Pinjaman Bank BCA"
                      value={values.journalEntries[index].partner}
                      onChange={(e) => handleJournalChange(index, "partner", e.currentTarget.value.toUpperCase())}
                      onBlur={handleBlur}
                      error={touched.journalEntries?.[index]?.partner && errors.journalEntries?.[index]?.partner}
                    />
                  </Group>

                  <Group w="100%" grow>
                    <NumberInput
                      hideControls
                      label="Nominal"
                      placeholder="Masukan Nominal"
                      value={values.journalEntries[index].amount}
                      onChange={(val) => handleJournalChange(index, "amount", val || 0)}
                      onBlur={handleBlur}
                      error={touched.journalEntries?.[index]?.amount && errors.journalEntries?.[index]?.amount}
                    />

                    <NumberInput
                      hideControls
                      label="Total Cicilan"
                      placeholder="Contoh: 3 X"
                      suffix=" x"
                      value={values.journalEntries[index].installment}
                      onChange={(val) => handleJournalChange(index, "installment", val || 0)}
                      onBlur={handleBlur}
                      error={touched.journalEntries?.[index]?.installment && errors.journalEntries?.[index]?.installment}
                    />
                  </Group>

                  <Group grow>
                    <DatePickerInput
                      label="Tanggal Uang Masuk"
                      placeholder="Tanggal"
                      locale="id"
                      clearable
                      radius="sm"
                      valueFormat="DD MMMM YYYY"
                      rightSection={<IconCalendar size={18} />}
                      value={values.journalEntries[index].date_inputed ? new Date(values.journalEntries[index].date_inputed) : null}
                      onChange={(date) => handleJournalChange(index, "date_inputed", date ? date.toISOString() : null)}
                    />

                    <DatePickerInput
                      label="Jatuh Tempo"
                      placeholder="Tanggal Jatuh Tempo"
                      locale="id"
                      clearable
                      radius="sm"
                      valueFormat="DD MMMM YYYY"
                      rightSection={<IconCalendar size={18} />}
                      value={values.journalEntries[index].due_date ? new Date(values.journalEntries[index].due_date) : null}
                      onChange={(date) => handleJournalChange(index, "due_date", date ? date.toISOString() : null)}
                    />
                  </Group>

                  {transactionType !== "payin" && (
                    <TextInput
                      label="Status Pembayaran"
                      placeholder="paid / unpaid"
                      value={values.journalEntries[index].status ?? ""}
                      onChange={(e) => {
                        const value = e.currentTarget.value;
                        handleJournalChange(index, "status", value);
                        handleJournalChange(index, "is_repaid", value === "paid");
                      }}
                    />
                  )}

                  <Textarea
                    label="Keterangan"
                    placeholder="Masukkan Keterangan"
                    value={values.journalEntries[index].note?.toUpperCase() || ""}
                    onChange={(e) => handleJournalChange(index, "note", e.currentTarget.value.toUpperCase())}
                  />
                </Stack>

                <Button variant="light" color="red" mt="sm" onClick={() => deleteJournalField(index)} leftSection={<IconTrash size={18} />}>
                  Hapus
                </Button>
              </Group>
            </SimpleGrid>
          ))}

          <Group justify="center">
            <Button onClick={addJournalField}>Tambah Field Baru</Button>
          </Group>
        </Stack>
      )}
    </FieldArray>
  );
};

export default memo(PayinForm);
