import React, { memo, useCallback, useState } from "react";
import { Stack, Group, TextInput, NumberInput, Textarea, Button, SimpleGrid, Badge, Switch, Select, Divider, Flex } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconTrash } from "@tabler/icons-react";
import { useFormikContext, FieldArray } from "formik";
import SelectFinanceTransactionCategory from "@/components/common/select/SelectTransactiontCategory";
import ButtonAdd from "@/components/common/button/buttonAdd";
import { calculateTotalBagiHasil } from "@/helper/calculateBagiHasil";

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
    date_inputed: string;
    due_date?: string;
  }>;
  touched?: Array<boolean | any>;
}

const JournalEntryForm = ({ companyId, transactionType, error, touched }: JournalFormProps) => {
  const { values, setFieldValue, handleBlur } = useFormikContext<{
    transactionType: "payin" | "payout";
    journalEntries: IJournalEntryCreate[];
  }>();

  const handleJournalChange = useCallback(
    (index: number, field: keyof IJournalEntryCreate, value: any) => {
      setFieldValue(`journalEntries.${index}.${field}`, value);
    },
    [setFieldValue]
  );

  // Add a new journal entry
  const addJournalField = useCallback(() => {
    setFieldValue("journalEntries", [
      ...values.journalEntries,
      {
        traansaction_id: "",
        amount: 0,
        date_inputed: null,
        description: "",
        due_date: null,
        installment: 0,
        invoice: "",
        is_repaid: false,
        note: "",
        partner: "",
        status: null,
        transaction_category_id: "",
        transaction_type: transactionType === "payin" ? "payout" : "payin", // Set the opposite value
        company_id: companyId || "",
      },
    ]);
  }, [setFieldValue, values.journalEntries, values.transactionType, companyId]);

  // Delete a journal entry by index
  const deleteJournalField = useCallback(
    (index: number) => {
      const updated = values.journalEntries.filter((_, idx) => idx !== index);
      setFieldValue("journalEntries", updated);
    },
    [setFieldValue, values.journalEntries]
  );

  // Handle switch change for a specific journal entry
  const handleSwitchChange = (index: number, checked: boolean) => {
    const updatedJournalEntries = [...values.journalEntries];
    updatedJournalEntries[index].transaction_type = checked ? "payin" : "payout";
    setFieldValue("journalEntries", updatedJournalEntries);
  };
  const [showProfit, setShowProfit] = useState<boolean[]>([]);
  const [showInstallment, setShowInstallment] = useState<boolean[]>([]);

  const [percentages, setPercentages] = useState<number[]>([]);
  return (
    <FieldArray name="journalEntries">
      {() => (
        <Stack gap="xl">
          {values?.journalEntries?.map((entry, index) => {
            // console.log("Status", entry.status);
            // console.log("entry", entry);

            const percentage = percentages[index] ?? 1; // Default percentage 1%
            const { totalBagiHasil, selisihBulan } = calculateTotalBagiHasil(entry, percentage);

            return (
              <SimpleGrid key={index} p={20} spacing="md">
                <Stack gap="xl">
                  {index === 0 && (
                    <Stack align="flex-end" style={{ width: "100%" }}>
                      <ButtonAdd onClick={addJournalField} size="3.5rem" />
                    </Stack>
                  )}
                </Stack>
                <Group>
                  <Switch
                    mr={16}
                    w={40}
                    checked={entry.transaction_type === "payin"}
                    onChange={(event) => handleSwitchChange(index, event.currentTarget.checked)} // Only changes the state on toggle
                    size="lg"
                  />
                  <Badge color={entry.transaction_type === "payin" ? "green" : "red"} w={80}>
                    {entry.transaction_type === "payin" ? "Pay In" : "Pay Out"}
                  </Badge>
                </Group>

                <Group justify="space-between" align="flex-start">
                  <Stack w="100%" gap="md">
                    {/* {entry.transaction_type !== "payin" && ( */}
                    <Group w="100%" grow>
                      <Select
                        error={touched?.[index]?.status && error?.[index]?.status}
                        clearable
                        withAsterisk
                        label="Status Pembayaran"
                        placeholder="Pilih Status Pembayaran"
                        data={[
                          { value: "paid", label: "Tunai" },
                          { value: "unpaid", label: "Tempo" },
                        ]}
                        onChange={(value: string | null) => {
                          const isPaid = value === "paid";
                          const isUnpaid = value === "unpaid";

                          handleJournalChange(index, "status", value);
                          handleJournalChange(index, "is_repaid", isPaid);
                          handleJournalChange(index, "invoice", isUnpaid ? "Tempo" : value === null ? null : "");
                          handleJournalChange(index, "transaction_id", isUnpaid ? "Tempo" : value === null ? null : "");
                        }}
                        onBlur={handleBlur}
                        value={entry.status}
                      />
                    </Group>
                    {/* )} */}

                    {entry.status && (
                      <>
                        <SelectFinanceTransactionCategory
                          companyId={companyId}
                          transactionType={entry.transaction_type}
                          transactionCategoryTerm=""
                          label="Kategori Transaksi"
                          onSelect={(selected) => {
                            handleJournalChange(index, "description", selected.description);
                            handleJournalChange(index, "transaction_category_id", selected.id);
                          }}
                          status={entry.status}
                          error={touched?.[index]?.transaction_category_id && error?.[index]?.transaction_category_id}
                        />
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
                      </>
                    )}

                    <TextInput
                      withAsterisk
                      label="Partner"
                      placeholder="Contoh: Pinjaman Bank BCA"
                      value={entry.partner}
                      onChange={(e) => handleJournalChange(index, "partner", e.currentTarget.value.toUpperCase())}
                      onBlur={handleBlur}
                      error={touched?.[index]?.partner && error?.[index]?.partner}
                    />

                    <Group gap="80px" mt={20}>
                      <Flex gap={"10px"}>
                        <Switch
                          size="lg"
                          //   label="Profit"
                          checked={showProfit[index] ?? false}
                          onChange={() => {
                            const newShowProfit = [...showProfit];
                            newShowProfit[index] = !newShowProfit[index];
                            setShowProfit(newShowProfit);
                          }}
                        />
                        <Badge color={showProfit[index] ? "darkblue" : "red"} w={80} mt={4}>
                          {showProfit[index] ? "Profit" : "Non Profit"}
                        </Badge>
                      </Flex>
                      {/* // )} */}

                      {entry.status !== "paid" && (
                        <Flex gap={"10px"}>
                          <Switch
                            size="lg"
                            checked={showInstallment[index] ?? false}
                            onChange={() => {
                              const newShowInstallment = [...showInstallment];
                              newShowInstallment[index] = !newShowInstallment[index];
                              setShowInstallment(newShowInstallment);
                            }}
                          />
                          <Badge mt={4} w={120} color={showInstallment[index] ? "orange" : "red"}>
                            {showInstallment[index] ? "Installment" : "Non Installment"}
                          </Badge>
                        </Flex>
                      )}
                    </Group>

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
                            const isoDate = date ? date.toISOString() : null;

                            handleJournalChange(index, "date_inputed", isoDate);
                            handleJournalChange(index, "repayment_date", isoDate);

                            // Jika status paid atau done, atur due_date dari date_inputed
                            if (entry.status === "paid" || entry.status === "done") {
                              handleJournalChange(index, "due_date", isoDate);
                            }
                          }}
                        />

                        {entry.status !== "paid" && (
                          <DatePickerInput
                            error={touched?.[index]?.due_date && error?.[index]?.due_date}
                            label="Jatuh Tempo"
                            disabled={showInstallment[index]}
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
                    {showInstallment[index] && (
                      <NumberInput
                        hideControls
                        w={200}
                        label="Cicilan"
                        placeholder={entry.installment && entry.installment !== 0 ? "" : "Contoh: 3 Bulan Cicilan"}
                        value={entry.installment && entry.installment !== 0 ? entry.installment : ""}
                        onChange={(val) => handleJournalChange(index, "installment", val || "")}
                        suffix=" bulan"
                      />
                    )}

                    {showProfit[index] && (
                      <Group>
                        <NumberInput w={100} label="Cicilan (Bulan)" value={selisihBulan} disabled readOnly hideControls />

                        <NumberInput
                          w={100}
                          label="Persentase(%)"
                          placeholder="Masukkan Persentase"
                          value={percentage}
                          onChange={(val) => {
                            const newPercentages = [...percentages];
                            newPercentages[index] = typeof val === "number" ? val : 1;
                            setPercentages(newPercentages);
                          }}
                          min={0}
                          max={100}
                          hideControls
                          step={0.1}
                        />

                        <TextInput w={200} label="Total Bagi Hasil" value={`Rp ${totalBagiHasil.toLocaleString("id-ID")}`} readOnly />
                      </Group>
                    )}

                    <Textarea
                      h={140}
                      error={touched?.[index]?.note && error?.[index]?.note}
                      label="Keterangan"
                      placeholder="Masukkan Keterangan"
                      value={entry.note?.toUpperCase() || ""}
                      onChange={(e) => handleJournalChange(index, "note", e.currentTarget.value.toUpperCase())}
                    />
                  </Stack>

                  {values.journalEntries.length > 1 && (
                    <Button
                      variant="light"
                      color="red"
                      mt="sm"
                      onClick={() => deleteJournalField(index)}
                      leftSection={<IconTrash size={18} />}
                    >
                      Hapus
                    </Button>
                  )}
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
