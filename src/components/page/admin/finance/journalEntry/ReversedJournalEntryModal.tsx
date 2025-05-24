import React, { memo, useCallback } from "react";
import { Modal, Button, Group, Stack, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form } from "formik";
import { initialValuesJournalEntry } from "@/utils/initialValues/initialValuesJournalEntry";
import { reversedValidationSchemaJournalEntry } from "@/utils/validation/reversedJournalEntry-validation";
import ReversedJournalEntryForm from "./ReversedJournalEntryForm";
import { useSubmitReservedJournalEntry } from "@/api/finance/postDataReservedJournalEntry";
import { initialValuesReservedJournalEntry } from "@/utils/initialValues/initialValuesReversedJournalEntry";

interface IReversedJournalEntryModalProps {
  companyId: string;
  transactionType: "payin" | "payout";
  selectedDebt?: IDebtSummaryItem;
  opened: boolean;
  close: () => void;
}

const ReversedJournalEntryModal: React.FC<IReversedJournalEntryModalProps> = ({
  companyId,
  transactionType,
  selectedDebt,
  opened,
  close,
}) => {
  // console.log("Modal opened:", opened); // Log when modal is opened or closed
  // console.log("Selected Debt:", selectedDebt);
  const { mutate: submitJournal, isPending: isLoadingSubmitJournalEntry } = useSubmitReservedJournalEntry(close, companyId);
  console.log("selectedDebt", selectedDebt);

  const handleSubmit = useCallback(
    (values: { journalEntries: IJournalEntryCreate[] }) => {
      if (!selectedDebt?.id) return;

      const newEntry: IJournalEntryCreate = {
        ...values.journalEntries[0],
        date_inputed: values.journalEntries[0].date_inputed || null,
        due_date: values.journalEntries[0].due_date || null,
      };

      const updatedDebt = {
        ...selectedDebt,
        id: selectedDebt.journal_entry_id,
        is_repaid: true,
        status: "done",
      };

      console.log("updatedDebt", updatedDebt);

      const payload = [updatedDebt, newEntry];
      submitJournal(payload);
    },
    [selectedDebt, submitJournal] // tambahkan semua dependensi yang digunakan dalam fungsi
  );

  return (
    <>
      <Modal
        onClose={() => {
          console.log("Close button clicked");
          close();
        }}
        size={"60%"}
        opened={opened}
      >
        <Formik
          initialValues={initialValuesReservedJournalEntry(companyId, transactionType, selectedDebt)}
          validationSchema={reversedValidationSchemaJournalEntry(transactionType)}
          validateOnBlur={false}
          enableReinitialize
          validateOnChange
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, values, errors, touched }) => {
            console.log("values", values);
            return (
              <SimpleGrid p={20} cols={1}>
                <Form onSubmit={handleSubmit}>
                  <Stack>
                    <ReversedJournalEntryForm
                      companyId={companyId}
                      transactionType={transactionType}
                      error={(errors.journalEntries as any) || []}
                      touched={(touched.journalEntries as any) || []}
                      selectedDebt={selectedDebt}
                    />

                    <Group justify="flex-end" mt="md">
                      <Button onClick={close} variant="default">
                        Cancel
                      </Button>
                      <Button type="submit" color="blue" disabled={isLoadingSubmitJournalEntry} loading={isLoadingSubmitJournalEntry}>
                        Tambah
                      </Button>
                    </Group>
                  </Stack>
                </Form>
              </SimpleGrid>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default memo(ReversedJournalEntryModal);
