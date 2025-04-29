import React, { memo, useCallback, useState } from "react";
import { Modal, Button, Group, Stack, Alert, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form } from "formik";
import ButtonAdd from "@/components/common/button/buttonAdd";
import { initialValuesJournalEntry } from "@/utils/initialValues/initialValuesJournalEntry";
import { validationSchemaJournalEntry } from "@/utils/validation/journalEntry-validation";
import { useQueryClient } from "@tanstack/react-query";
import JournalEntryForm from "./JournalEntryForm";
import { useSubmitJournalEntry } from "@/api/finance/postDataJournalEntry";
import { SelectTransactionGoals } from "@/components/common/select/SelectTransactionGoal";

interface ICreateJournalEntryModalProps {
  transactionType: "payin" | "payout";
  companyId?: string;
}

const CreateJournalEntryModal: React.FC<ICreateJournalEntryModalProps> = ({ transactionType, companyId }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const [transactionGoals, setTransactionGoals] = useState<string>("");

  const { mutate: submitJournal, isPending: isLoadingSubmitJournalEntry } = useSubmitJournalEntry(close, companyId);

  // 3. useCallback for handleSubmit
  const handleSubmit = (values: any) => {
    const transformedEntries = values.journalEntries.map((entry: any) => ({
      ...entry,
      date_inputed: entry.date_inputed,
      due_date: entry.due_date || null,
    }));

    submitJournal(transformedEntries);
  };
  return (
    <>
      <ButtonAdd onClick={open} size={"3.5rem"} />
      <Modal opened={opened} onClose={close} size={"60%"}>
        <Formik
          initialValues={initialValuesJournalEntry(companyId, transactionType)}
          validationSchema={validationSchemaJournalEntry(transactionType)}
          validateOnBlur={false}
          enableReinitialize
          validateOnChange
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, values, errors, touched }) => {
            console.log("values", values);
            // console.log("errors", errors);
            return (
              <SimpleGrid p={20} cols={1}>
                <Form onSubmit={handleSubmit}>
                  <Stack>
                    <JournalEntryForm
                      companyId={companyId}
                      transactionType={transactionType}
                      error={(errors.journalEntries as any) || []} // Kirimkan array error ke FormGoods
                      touched={(touched.journalEntries as any) || []}
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

export default memo(CreateJournalEntryModal);
