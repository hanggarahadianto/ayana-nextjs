import React, { memo, useCallback } from "react";
import { Modal, Button, Group, Stack, SimpleGrid } from "@mantine/core";
import { Formik, Form } from "formik";
import { reversedValidationSchemaJournalEntry } from "@/utils/validation/reversedJournalEntry-validation";
import ReversedJournalEntryForm from "./ReversedJournalEntryForm";
import { useSubmitReservedJournalEntry } from "@/api/finance/postDataReservedJournalEntry";
import { initialValuesReservedJournalEntry } from "@/utils/initialValues/initialValuesReversedJournalEntry";

interface IReversedJournalEntryModalProps {
  companyId: string;
  transactionType: "payin" | "payout";
  transactionCategoryTerm: string;
  initialData?: IJournalEntryUpdate;
  opened: boolean;
  close: () => void;
}

const ReversedJournalEntryModal: React.FC<IReversedJournalEntryModalProps> = ({
  companyId,
  transactionType,
  transactionCategoryTerm,
  initialData,
  opened,
  close,
}) => {
  const { mutate: submitJournal, isPending: isLoadingSubmitJournalEntry } = useSubmitReservedJournalEntry(close, companyId);
  const handleSubmit = useCallback(
    (values: { journalEntries: IJournalEntryCreate[] }) => {
      if (!initialData?.id) return;
      const newEntry: IJournalEntryCreate = {
        ...values.journalEntries[0],
        date_inputed: initialData.date_inputed,
        due_date: values.journalEntries[0].due_date || null,
      };

      const updatedData = {
        ...initialData,
        is_repaid: true,
        status: "done",
        repayment_date: newEntry.repayment_date || null,
      };
      const payload = [updatedData, newEntry];
      submitJournal(payload);
    },
    [initialData, submitJournal]
  );

  return (
    <>
      <Modal
        onClose={() => {
          close();
        }}
        size={"60%"}
        opened={opened}
      >
        <Formik
          initialValues={initialValuesReservedJournalEntry(companyId, transactionType, initialData)}
          validationSchema={reversedValidationSchemaJournalEntry(transactionType)}
          validateOnBlur={false}
          enableReinitialize
          validateOnChange
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, values, errors, touched }) => {
            // console.log("values", values);
            // console.log("errors", errors);
            return (
              <SimpleGrid p={20} cols={1}>
                <Form onSubmit={handleSubmit}>
                  <Stack>
                    <ReversedJournalEntryForm
                      companyId={companyId}
                      transactionType={transactionType}
                      transactionCategoryTerm={transactionCategoryTerm}
                      error={(errors.journalEntries as any) || []}
                      touched={(touched.journalEntries as any) || []}
                      initialData={initialData}
                    />

                    <Group justify="flex-end" mt="md">
                      <Button onClick={close} variant="default">
                        Batal
                      </Button>
                      <Button type="submit" color="blue" disabled={isLoadingSubmitJournalEntry} loading={isLoadingSubmitJournalEntry}>
                        Lunaskan
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
