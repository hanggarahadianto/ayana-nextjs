import React from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, Card, Text, Stack, InputWrapper, SimpleGrid, Input, Flex } from "@mantine/core";

import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { IconCalendar, IconPlus } from "@tabler/icons-react";
import { initialValuePayoutCreate } from "../../../../lib/initialValues/initialValuesPayout";
import { useSubmitPayoutForm } from "@/api/payout/postDataPayout";
import ButtonAdd from "@/lib/button/buttonAdd";

interface AddPayoutModalProps {
  refetchPayloadData: () => void;
  companyCode: any | null;
  companyId: string | null;
}

const AddPayoutModal = ({ refetchPayloadData, companyCode, companyId }: AddPayoutModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: postData, isPending: isLoadingSubmitProjectData } = useSubmitPayoutForm(refetchPayloadData, close);

  const handleSubmit = (values: IPayoutCreate, { setSubmitting }: any) => {
    console.log("Form values submitted:", values);
    const payload = {
      ...values,
      company: companyCode ?? "", // Default ke string kosong jika companyId null
      company_id: companyId ?? "", // Default ke string kosong jika companyId null
    };
    postData(payload);
    setSubmitting(false);
  };

  return (
    <>
      <ButtonAdd onClick={open} size={"3.5rem"} />

      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        yOffset="100px" // Moves modal down
      >
        <Formik
          initialValues={initialValuePayoutCreate}
          validateOnBlur={false}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, handleBlur }) => {
            console.log(values);
            // console.log("ERROR", errors);

            const handleInputChange = (setFieldValue: any, field: string, value: any) => {
              setFieldValue(field, value); // Update field value in Formik
            };

            return (
              <>
                <Form>
                  <SimpleGrid p={20}>
                    <Stack gap={20}>
                      <Select
                        label="Status"
                        placeholder="Pilih Status"
                        value={values.status}
                        onChange={(value: any) => {
                          setFieldValue("status", value);
                          if (value !== "tunai") {
                            setFieldValue("invoice", "invoice-tempo");
                          } else {
                            setFieldValue("invoice", ""); // Kosongkan kembali jika status tunai
                          }
                        }}
                        data={[
                          { value: "tunai", label: "Tunai" },
                          { value: "tempo", label: "Tempo" },
                        ]}
                        required
                      />

                      {values.status === "tunai" && (
                        <InputWrapper
                          label="No Invoice"
                          withAsterisk
                          error={touched.invoice && errors.invoice ? errors.invoice : undefined}
                        >
                          <TextInput
                            placeholder="Masukan Invoice"
                            value={values.invoice?.toUpperCase() || ""}
                            onChange={(event) => setFieldValue("invoice", event.currentTarget.value.toUpperCase())}
                          />
                        </InputWrapper>
                      )}

                      <Group gap={40}>
                        <DatePickerInput
                          label="Tanggal Pembelian"
                          w={200}
                          type="default"
                          firstDayOfWeek={0}
                          placeholder="Tanggal"
                          clearable
                          locale="id"
                          radius="sm"
                          valueFormat="DD MMMM YYYY"
                          rightSection={<IconCalendar size={18} />}
                          onChange={(value: Date | null) => {
                            if (value) {
                              const formattedDate = value.toISOString(); // Convert to ISO format (e.g., "2025-01-01T00:00:00Z")
                              handleInputChange(setFieldValue, "date_inputed", formattedDate);
                            }
                          }}
                          onBlur={handleBlur}
                          error={touched.date_inputed && errors.date_inputed ? errors.date_inputed : undefined}
                        />

                        <DatePickerInput
                          label="Jatuh Tempo"
                          w={200}
                          type="default"
                          firstDayOfWeek={0}
                          placeholder="Jatuh Tempo"
                          clearable
                          locale="id"
                          radius="sm"
                          valueFormat="DD MMMM YYYY"
                          rightSection={<IconCalendar size={18} />}
                          onChange={(value: Date | null) => {
                            if (value) {
                              const formattedDate = value.toISOString(); // Convert to ISO format (e.g., "2025-01-01T00:00:00Z")
                              handleInputChange(setFieldValue, "due_date", formattedDate);
                            }
                          }}
                          onBlur={handleBlur}
                        />
                      </Group>

                      <InputWrapper
                        label="Nominal"
                        withAsterisk
                        required
                        error={touched.nominal && errors.nominal ? errors.nominal : undefined}
                      >
                        <TextInput
                          placeholder="Masukan Biaya Proyek"
                          value={values.nominal ? `Rp. ${values.nominal.toLocaleString("id-ID")}` : ""}
                          onChange={(event) => {
                            const rawValue = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                            const numericValue = Number(rawValue) || 0;
                            setFieldValue("nominal", numericValue); // Store as number
                          }}
                        />
                      </InputWrapper>
                      <Textarea
                        value={values.note.toUpperCase()}
                        label="Keterangan"
                        placeholder="Masukan Keterangan"
                        onChange={(event) => setFieldValue("note", event.currentTarget.value.toUpperCase())}
                        mt="md"
                      />
                    </Stack>

                    <Group justify="flex-end" mt="md">
                      <Button onClick={close} variant="default">
                        Cancel
                      </Button>
                      <Button type="submit" loading={isLoadingSubmitProjectData}>
                        Tambah Payout
                      </Button>
                    </Group>
                  </SimpleGrid>
                </Form>
              </>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default AddPayoutModal;
