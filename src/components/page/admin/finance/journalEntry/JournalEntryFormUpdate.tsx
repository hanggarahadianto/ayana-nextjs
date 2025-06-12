import React, { memo, useCallback } from "react";
import { Stack, Group, TextInput, Textarea, SimpleGrid, Badge, Switch, Divider, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useFormikContext, FieldArray } from "formik";

interface JournalFormProps {
  initialData: IJournalEntryItem;

  error?: Array<{
    transaction_id?: string;
    amount?: string;
    invoice?: string;
    note?: string;
    transaction_category_id?: string;
    partner?: string;
    status?: string;
    total_cost?: string;
    date_inputed: string;
    due_date?: string;
  }>;
  touched?: Array<boolean | any>;
}

const JournalEntryForm = ({ initialData, error, touched }: JournalFormProps) => {
  const { values, setFieldValue, handleBlur } = useFormikContext<{
    transactionType: "payin" | "payout";
    journalEntries: IJournalEntryItem[];
  }>();

  const handleJournalChange = useCallback(
    (index: number, field: keyof IJournalEntryCreate, value: any) => {
      setFieldValue(`journalEntries.${index}.${field}`, value);
    },
    [setFieldValue]
  );

  // console.log("initialData", initialData);

  return (
    <FieldArray name="journalEntries">
      {() => (
        <Stack gap="xl">
          {values?.journalEntries?.map((entry: IJournalEntryItem, index) => {
            // console.log("values", values);

            return (
              <SimpleGrid key={index} p={20} spacing="md">
                <Text fw={600}>
                  Ubah Data {initialData.transaction_category_name} {initialData.partner}
                </Text>
                <Group>
                  <Switch disabled mr={16} w={40} checked={entry.transaction_type === "payin"} size="lg" />
                  <Badge color={entry.transaction_type === "payin" ? "green" : "red"} w={80}>
                    {entry.transaction_type === "payin" ? "Pay In" : "Pay Out"}
                  </Badge>
                </Group>

                <Group justify="space-between" align="flex-start">
                  <Stack w="100%" gap="md">
                    <Group w="100%" grow>
                      <TextInput
                        error={touched?.[index]?.transaction_id && error?.[index]?.transaction_id}
                        withAsterisk
                        label="Transaction ID"
                        placeholder="Contoh: 001"
                        value={entry.transaction_id || ""}
                        onChange={(e) => handleJournalChange(index, "transaction_id", e.currentTarget.value)}
                        onBlur={handleBlur}
                        disabled={entry.transaction_type !== "payin" && entry.status === "unpaid"}
                      />
                      <TextInput
                        error={touched?.[index]?.invoice && error?.[index]?.invoice}
                        disabled={entry.transaction_type !== "payin" && entry.status === "unpaid"}
                        withAsterisk
                        label="No Invoice"
                        placeholder="Contoh: INV/001"
                        value={entry.invoice}
                        onChange={(e) => handleJournalChange(index, "invoice", e.currentTarget.value)}
                        onBlur={handleBlur}
                      />
                    </Group>
                    <TextInput
                      withAsterisk
                      label="Partner"
                      placeholder="Contoh: Pinjaman Bank BCA"
                      value={entry.partner}
                      onChange={(e) => handleJournalChange(index, "partner", e.currentTarget.value.toUpperCase())}
                      onBlur={handleBlur}
                      error={touched?.[index]?.partner && error?.[index]?.partner}
                    />

                    <Divider my={20} />
                    {entry.status && (
                      <Group grow mt={20}>
                        <DatePickerInput
                          error={touched?.[index]?.date_inputed && error?.[index]?.date_inputed}
                          label="Tanggal Transaksi"
                          placeholder="Tanggal"
                          locale="id"
                          clearable
                          radius="sm"
                          valueFormat="DD MMMM YYYY"
                          rightSection={<IconCalendar size={18} />}
                          value={entry.date_inputed ? new Date(entry.date_inputed) : null}
                          onChange={(date) => handleJournalChange(index, "date_inputed", date ? date.toISOString() : null)}
                        />

                        {entry.status !== "paid" && (
                          <DatePickerInput
                            error={touched?.[index]?.due_date && error?.[index]?.due_date}
                            label="Jatuh Tempo"
                            placeholder="Tanggal Jatuh Tempo"
                            locale="id"
                            clearable
                            radius="sm"
                            valueFormat="DD MMMM YYYY"
                            rightSection={<IconCalendar size={18} />}
                            value={entry.due_date ? new Date(entry.due_date) : null}
                            onChange={(date) => handleJournalChange(index, "due_date", date ? date.toISOString() : null)}
                          />
                        )}
                      </Group>
                    )}

                    <Group w="100%" grow>
                      <TextInput
                        error={touched?.[index]?.amount && error?.[index]?.amount}
                        label="Nominal"
                        placeholder="Masukkan Nominal"
                        value={entry.amount ? `Rp. ${entry.amount.toLocaleString("id-ID")}` : ""}
                        onChange={(e) => {
                          const raw = e.currentTarget.value.replace(/\D/g, "");
                          const numeric = Number(raw) || 0;
                          handleJournalChange(index, "amount", numeric);
                        }}
                      />
                    </Group>

                    <Textarea
                      error={touched?.[index]?.note && error?.[index]?.note}
                      label="Keterangan"
                      placeholder="Masukkan Keterangan"
                      value={entry.note?.toUpperCase() || ""}
                      onChange={(e) => handleJournalChange(index, "note", e.currentTarget.value.toUpperCase())}
                    />
                  </Stack>
                </Group>
              </SimpleGrid>
            );
          })}
        </Stack>
      )}
    </FieldArray>
  );
};

export default memo(JournalEntryForm);
