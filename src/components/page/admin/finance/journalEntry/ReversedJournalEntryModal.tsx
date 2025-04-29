import React, { memo } from "react";
import { Modal, Button, Group, Stack, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form } from "formik";
import { initialValuesJournalEntry } from "@/utils/initialValues/initialValuesJournalEntry";
import { reversedValidationSchemaJournalEntry } from "@/utils/validation/reversedJournalEntry-validation";
import ReversedJournalEntryForm from "./ReversedJournalEntryForm";
import { useSubmitReservedJournalEntry } from "@/api/finance/postDataReservedJournalEntry";

interface IReversedJournalEntryModalProps {
  companyId: string;
  transactionType: "payin" | "payout";
  selectedDebt?: IDebtSummaryItem;
}

const ReversedJournalEntryModal: React.FC<IReversedJournalEntryModalProps> = ({ companyId, transactionType, selectedDebt }) => {
  console.log(selectedDebt);
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: submitJournal, isPending: isLoadingSubmitJournalEntry } = useSubmitReservedJournalEntry(close, companyId);

  const handleSubmit = (values: any) => {
    if (!selectedDebt?.id) return;

    const newEntry = {
      ...values.journalEntries[0], // hanya 1 entri yang baru
      date_inputed: values.journalEntries[0].date_inputed,
      due_date: values.journalEntries[0].due_date || null,
    };

    const updatedDebt = {
      ...selectedDebt,
      is_repaid: true,
      status: "paid",
    };

    const payload = [updatedDebt, newEntry];
    submitJournal(payload);
  };

  return (
    <>
      <Modal opened={opened || !!selectedDebt} onClose={close} size={"60%"}>
        <Formik
          initialValues={initialValuesJournalEntry(companyId, transactionType)}
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
