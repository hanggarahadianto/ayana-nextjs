import React, { memo } from "react";
import { Modal, Button, Group, Stack, Alert, SimpleGrid } from "@mantine/core";
import { Formik, Form } from "formik";
import { initialValuesJournalEntryUpdate } from "@/utils/initialValues/initialValuesJournalEntry";
import { validationSchemaJournalEntry } from "@/utils/validation/journalEntry-validation";
import { useModalStore } from "@/store/modalStore";
import JournalEntryFormUpdate from "./JournalEntryFormUpdate";
import { useSubmitJournalEntryUpdate } from "@/api/finance/updateDataJournalEntry";

interface IUpdateJournalEntryModalProps {
  initialValues: IJournalEntryUpdate;
  transactionType: "payin" | "payout";
  companyId?: string;
}

const UpdateJournalEntryModal: React.FC<IUpdateJournalEntryModalProps> = ({ transactionType, companyId }) => {
  const { opened, modalName, modalData: initialData, closeModal } = useModalStore();

  const { mutate: submitJournal, isPending: isLoadingUpdateJournalEntry } = useSubmitJournalEntryUpdate(closeModal);

  // 3. useCallback for handleSubmit
  const handleSubmit = ({ journalEntries }: { journalEntries: IJournalEntryUpdate[] }) => {
    if (!journalEntries?.length) {
      console.warn("Tidak ada entri jurnal yang dikirim.");
      return;
    }

    const [entry] = journalEntries;

    const transformedEntry: IJournalEntryUpdate = {
      ...entry,
      due_date: entry.due_date || null,
    };

    console.log("Transformed Entry:", transformedEntry);

    submitJournal(transformedEntry); // kirim objek langsung, bukan array
  };

  if (modalName !== "editCashInData" || !opened || !initialData) return null;
  // console.log("initialData", initialData);

  return (
    <>
      <Modal opened={opened} onClose={closeModal} size={"60%"}>
        <Formik
          initialValues={initialValuesJournalEntryUpdate(initialData, companyId, transactionType)}
          validationSchema={validationSchemaJournalEntry(transactionType)}
          validateOnBlur={false}
          enableReinitialize
          validateOnChange
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, errors, touched }) => {
            // console.log("values", values);
            // console.log("errors", errors);
            return (
              <SimpleGrid p={20} cols={1}>
                <Form onSubmit={handleSubmit}>
                  <Stack>
                    <JournalEntryFormUpdate
                      companyId={companyId}
                      transactionType={transactionType}
                      error={(errors.journalEntries as any) || []} // Kirimkan array error ke FormGoods
                      touched={(touched.journalEntries as any) || []}
                    />

                    <Group justify="flex-end" mt="md">
                      <Button onClick={closeModal} variant="default" disabled={isLoadingUpdateJournalEntry}>
                        Cancel
                      </Button>
                      <Button type="submit" color="blue" disabled={isLoadingUpdateJournalEntry} loading={isLoadingUpdateJournalEntry}>
                        Ubah
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

export default memo(UpdateJournalEntryModal);
