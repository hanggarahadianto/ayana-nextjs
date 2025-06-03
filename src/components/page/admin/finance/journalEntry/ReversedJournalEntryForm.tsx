import React, { memo, useCallback } from "react";
import { Stack, Group, TextInput, Textarea, SimpleGrid, Badge, Switch, Divider, Text, InputWrapper, Card, Grid } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useFormikContext, FieldArray } from "formik";
import SelectFinanceTransactionCategory from "@/components/common/select/SelectTransactiontCategory";
import { formatCurrency } from "@/helper/formatCurrency";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";

interface JournalFormProps {
  companyId?: string;
  transactionType: "payin" | "payout";
  error?: Array<{
    transaction_id?: string;
    amount?: string;
    invoice?: string;
    note?: string;
    transaction_category_id?: string;
    partner?: string;
    status?: string;
    total_cost?: string;
    date_inputed?: string;
    due_date?: string;
  }>;
  touched?: Array<boolean | any>;
  initialData: any;
}

const ReversedJournalEntryForm = ({ companyId, transactionType, error, touched, initialData }: JournalFormProps) => {
  // console.log("transactionType,", transactionType);
  const { values, setFieldValue, handleBlur } = useFormikContext<{
    transactionType: "payin" | "payout";
    journalEntries: IJournalEntryCreate[];
  }>();

  // Handle changes to the journal entry fields
  const handleJournalChange = useCallback(
    (index: number, field: keyof IJournalEntryCreate, value: any) => {
      setFieldValue(`journalEntries.${index}.${field}`, value);
    },
    [setFieldValue]
  );

  return (
    <FieldArray name="journalEntries">
      {() => (
        <Stack gap="xl">
          {values?.journalEntries?.map((entry, index) => {
            // console.log("values", values);
            // console.log("errors", error);

            return (
              <SimpleGrid key={index} p={20} spacing="md">
                <Text>
                  Pelunasan Untuk {initialData.label} {initialData.transaction_category_name}{" "}
                  {initialData?.description?.toLowerCase().replace(/\b\w/g, (char: string) => char.toUpperCase())}
                </Text>

                <Card>
                  <Grid p={12}>
                    <Grid.Col span={4}>
                      <Text>Invoice</Text>
                      <Text>Nominal</Text>
                      <Text>Tanggal Jatuh Tempo</Text>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Text>: {initialData.invoice}</Text>
                      <Text>: {formatCurrency(Math.abs(initialData?.amount || 0))}</Text>
                      <Text>: {formatDateIndonesia(initialData?.due_date)}</Text>
                    </Grid.Col>
                  </Grid>
                </Card>

                <Group>
                  <Switch disabled mr={16} w={40} checked={transactionType === "payin"} size="lg" />
                  <Badge color={transactionType === "payin" ? "green" : "red"} w={80}>
                    {transactionType === "payin" ? "Pay In" : "Pay Out"}
                  </Badge>
                </Group>

                <Group justify="space-between" align="flex-start">
                  <Stack w="100%" gap="md">
                    <InputWrapper error={touched?.[index]?.transaction_category_id && error?.[index]?.transaction_category_id}>
                      <SelectFinanceTransactionCategory
                        companyId={companyId}
                        transactionType={transactionType}
                        label="Kategori Transaksi"
                        onSelect={(selected) => {
                          handleJournalChange(index, "description", selected.description);
                          handleJournalChange(index, "transaction_category_id", selected.id);
                          handleJournalChange(index, "status", "done");
                        }}
                        status="paid"
                      />
                    </InputWrapper>

                    <Group w="100%" grow>
                      <TextInput
                        error={touched?.[index]?.transaction_id && error?.[index]?.transaction_id}
                        withAsterisk
                        label="Transaction ID"
                        placeholder="Contoh: 001"
                        value={entry.transaction_id || ""}
                        onChange={(e) => handleJournalChange(index, "transaction_id", e.currentTarget.value)}
                        onBlur={handleBlur}
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
                          onChange={(date) => {
                            handleJournalChange(index, "date_inputed", date ? date.toISOString() : null);
                            handleJournalChange(index, "repayment_date", date ? date.toISOString() : null);
                          }}
                        />

                        {entry.status !== "paid" && (
                          <DatePickerInput
                            error={touched?.[index]?.due_date && error?.[index]?.due_date}
                            disabled={initialData.due_date}
                            label="Jatuh Tempo"
                            placeholder="Tanggal Jatuh Tempo"
                            locale="id"
                            clearable
                            radius="sm"
                            valueFormat="DD MMMM YYYY"
                            rightSection={<IconCalendar size={18} />}
                            value={initialData.due_date ? new Date(initialData.due_date) : null}
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

export default memo(ReversedJournalEntryForm);
