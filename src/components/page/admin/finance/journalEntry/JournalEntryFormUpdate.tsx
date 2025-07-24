import React, { memo, useCallback } from "react";
import { Stack, Group, TextInput, Textarea, SimpleGrid, Badge, Switch, Divider, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useFormikContext, FieldArray } from "formik";

interface JournalFormProps {
  initialData: IJournalEntryItem;
  error?: {
    journalEntries?: Array<Partial<Record<keyof IJournalEntryItem, string>>>;
  };
  touched?: {
    journalEntries?: Array<Partial<Record<keyof IJournalEntryItem, boolean>>>;
  };
}

const JournalEntryForm = ({ initialData, error, touched }: JournalFormProps) => {
  const { values, setFieldValue, handleBlur } = useFormikContext<{
    transactionType: "payin" | "payout";
    journalEntries: IJournalEntryItem[];
  }>();

  const handleJournalChange = useCallback(
    (index: number, field: keyof IJournalEntryItem, value: any) => {
      setFieldValue(`journalEntries.${index}.${field}`, value);
    },
    [setFieldValue]
  );

  return (
    <FieldArray name="journalEntries">
      {() => (
        <Stack gap="xl">
          {values?.journalEntries?.map((entry, index) => {
            const isDisabled = entry.transaction_type !== "payin" && entry.status === "unpaid";

            return (
              <SimpleGrid key={entry.transaction_id || index} p={20} spacing="md">
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
                        withAsterisk
                        label="Transaction ID"
                        placeholder="Contoh: 001"
                        value={entry.transaction_id || ""}
                        onChange={(e) => handleJournalChange(index, "transaction_id", e.currentTarget.value)}
                        onBlur={handleBlur}
                        disabled={isDisabled}
                        error={touched?.journalEntries?.[index]?.transaction_id && error?.journalEntries?.[index]?.transaction_id}
                      />

                      <TextInput
                        withAsterisk
                        label="No Invoice"
                        placeholder="Contoh: INV/001"
                        value={entry.invoice || ""}
                        onChange={(e) => handleJournalChange(index, "invoice", e.currentTarget.value)}
                        onBlur={handleBlur}
                        disabled={isDisabled}
                        error={touched?.journalEntries?.[index]?.invoice && error?.journalEntries?.[index]?.invoice}
                      />
                    </Group>

                    <TextInput
                      withAsterisk
                      label="Partner"
                      placeholder="Contoh: Pinjaman Bank BCA"
                      value={entry.partner || ""}
                      onChange={(e) => handleJournalChange(index, "partner", e.currentTarget.value.toUpperCase())}
                      onBlur={handleBlur}
                      error={touched?.journalEntries?.[index]?.partner && error?.journalEntries?.[index]?.partner}
                      style={{ textTransform: "uppercase" }}
                    />

                    <Divider my={20} />

                    {entry.status && (
                      <Group grow mt={20}>
                        <DatePickerInput
                          label="Tanggal Transaksi"
                          placeholder="Tanggal"
                          locale="id"
                          clearable
                          radius="sm"
                          valueFormat="DD MMMM YYYY"
                          rightSection={<IconCalendar size={18} />}
                          value={entry.date_inputed ? new Date(entry.date_inputed) : null}
                          onChange={(date) => handleJournalChange(index, "date_inputed", date ? date.toISOString() : null)}
                          error={touched?.journalEntries?.[index]?.date_inputed && error?.journalEntries?.[index]?.date_inputed}
                        />

                        {entry.status !== "paid" && (
                          <DatePickerInput
                            label="Jatuh Tempo"
                            placeholder="Tanggal Jatuh Tempo"
                            locale="id"
                            clearable
                            radius="sm"
                            valueFormat="DD MMMM YYYY"
                            rightSection={<IconCalendar size={18} />}
                            value={entry.due_date ? new Date(entry.due_date) : null}
                            onChange={(date) => handleJournalChange(index, "due_date", date ? date.toISOString() : null)}
                            error={touched?.journalEntries?.[index]?.due_date && error?.journalEntries?.[index]?.due_date}
                          />
                        )}
                      </Group>
                    )}

                    <Group w="100%" grow>
                      <TextInput
                        label="Nominal"
                        placeholder="Masukkan Nominal"
                        value={typeof entry.amount === "number" ? `Rp. ${entry.amount.toLocaleString("id-ID")}` : ""}
                        onChange={(e) => {
                          const raw = e.currentTarget.value.replace(/\D/g, "");
                          const numeric = Number(raw) || 0;
                          handleJournalChange(index, "amount", numeric);
                        }}
                        error={touched?.journalEntries?.[index]?.amount && error?.journalEntries?.[index]?.amount}
                      />
                    </Group>

                    {/* <Textarea
                      label="Keterangan"
                      placeholder="Masukkan Keterangan"
                      value={entry.note?.toUpperCase() || ""}
                      onChange={(e) => handleJournalChange(index, "note", e.currentTarget.value.toUpperCase())}
                      error={touched?.journalEntries?.[index]?.note && error?.journalEntries?.[index]?.note}
                      style={{ textTransform: "uppercase" }}
                    /> */}
                    <Textarea
                      placeholder="Masukkan Keterangan"
                      value={entry.note || ""}
                      onChange={(e) => handleJournalChange(index, "note", e.currentTarget.value)}
                      styles={{
                        input: {
                          textTransform: "uppercase", // tampilan saja
                        },
                      }}
                      error={touched?.journalEntries?.[index]?.note && error?.journalEntries?.[index]?.note}
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
