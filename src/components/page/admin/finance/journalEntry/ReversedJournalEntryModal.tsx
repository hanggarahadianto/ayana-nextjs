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
  initialData?: IJournalEntry;
  opened: boolean;
  close: () => void;
}

const ReversedJournalEntryModal: React.FC<IReversedJournalEntryModalProps> = ({
  companyId,
  transactionType,
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
        date_inputed: values.journalEntries[0].date_inputed || null,
        due_date: values.journalEntries[0].due_date || null,
      };

      const updatedDebt = {
        ...initialData,
        is_repaid: true,
        status: "done",
      };

      // console.log("updatedDebt", updatedDebt);

      const payload = [updatedDebt, newEntry];
      submitJournal(payload);
    },
    [initialData, submitJournal] // tambahkan semua dependensi yang digunakan dalam fungsi
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
          initialValues={initialValuesReservedJournalEntry(companyId, transactionType)}
          validationSchema={reversedValidationSchemaJournalEntry(transactionType)}
          validateOnBlur={false}
          enableReinitialize
          validateOnChange
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, values, errors, touched }) => {
            // console.log("values", values);
            return (
              <SimpleGrid p={20} cols={1}>
                <Form onSubmit={handleSubmit}>
                  <Stack>
                    <ReversedJournalEntryForm
                      companyId={companyId}
                      transactionType={transactionType}
                      error={(errors.journalEntries as any) || []}
                      touched={(touched.journalEntries as any) || []}
                      initialData={initialData}
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
