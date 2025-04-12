import React, { memo, useCallback, useEffect } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Select,
  Textarea,
  Stack,
  InputWrapper,
  SimpleGrid,
  Input,
  Flex,
  Text,
  NumberInput,
  Box,
  FileInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { IconCalendar } from "@tabler/icons-react";
import { useSubmitPayoutForm } from "@/api/payout/postDataPayout";
import ButtonAdd from "@/lib/button/buttonAdd";
import { initialValuePayoutCreate } from "@/lib/initialValues/initialValuesPayout";
import { differenceInMonths } from "date-fns";
import { initialValueInvestmentCreate } from "@/lib/initialValues/initialValuesInvestment";

interface AddInvestmentModalProps {
  refetchPayloadData: () => void;
  companyCode: any | null;
  companyId: string | null;
}

const AddInvestmentModal = ({ refetchPayloadData, companyCode, companyId }: AddInvestmentModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: postData, isPending: isLoadingSubmitProjectData } = useSubmitPayoutForm(refetchPayloadData, close);

  const handleSubmit = useCallback(
    (values: IInvestmentCreate, { setSubmitting }: any) => {
      console.log("Form values submitted:", values);
      // const payload = {
      //   ...values,
      //   payment_date: values.payment_date === "" ? null : values.payment_date,
      //   company: companyCode ?? "",
      //   company_id: companyId ?? "",
      // };
      // postData(payload);
      // setSubmitting(false);
    },
    [companyCode, companyId, postData]
  );

  return (
    <>
      <ButtonAdd onClick={open} size={"3.5rem"} />

      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        yOffset="100px" // Moves modal down
      >
        <Formik
          initialValues={initialValueInvestmentCreate}
          validateOnBlur={false}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, handleBlur }) => {
            console.log(values);

            const handleInputChange = useCallback((setFieldValue: any, field: string, value: any) => {
              setFieldValue(field, value);
            }, []);

            useEffect(() => {
              if ((values.nominal && values.percentage_profit, values.date_inputed && values.due_date)) {
                const start = new Date(values.date_inputed);
                const end = new Date(values.due_date);
                const months = differenceInMonths(end, start);
                const percentage = values.percentage_profit ?? 0;

                const bagiHasil = values.nominal * (percentage / 100) * months;
                console.log("Bagi Hasil:", bagiHasil);
                setFieldValue("investment_profit", bagiHasil);
              }
            }, [values.nominal, values.percentage_profit, values.date_inputed, values.due_date]);

            return (
              <>
                <Form>
                  <SimpleGrid p={20}>
                    <Stack gap={20}>
                      <TextInput
                        withAsterisk
                        w={200}
                        label="Nama Investor"
                        error={touched.investor_name && errors.investor_name ? errors.investor_name : undefined}
                        placeholder="Masukan Nama Investor"
                        value={values.investor_name?.toUpperCase() || ""}
                        onChange={(event) => setFieldValue("investor_name", event.currentTarget.value.toUpperCase())}
                      />

                      <Group>
                        <TextInput
                          w={200}
                          label="Nominal"
                          withAsterisk
                          required
                          error={touched.nominal && errors.nominal ? errors.nominal : undefined}
                          placeholder="Masukan Nominal"
                          value={values.nominal ? `Rp. ${values.nominal.toLocaleString("id-ID")}` : ""}
                          onChange={(event) => {
                            const rawValue = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                            const numericValue = Number(rawValue) || 0;
                            setFieldValue("nominal", numericValue); // Store as number
                          }}
                        />
                        <NumberInput
                          hideControls
                          prefix=""
                          suffix="%"
                          w={200}
                          label="Persentase Profit"
                          placeholder="Persentase"
                          value={Number(values.percentage_profit) || undefined}
                          onChange={(value) => handleInputChange(setFieldValue, "percentage_profit", value)}
                        />
                      </Group>

                      <Group>
                        <DatePickerInput
                          label="Tanggal Investasi"
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
                        <TextInput
                          value={values.investment_profit ? `Rp. ${values.investment_profit.toLocaleString("id-ID")}` : ""}
                          w={200}
                          label="Total Nilai Bagi Hasil"
                          readOnly
                          withAsterisk
                          required
                          placeholder="Total Nilai Bagi Hasil"
                        />
                      </Group>
                      <FileInput
                        w={200}
                        label="Upload Bukti Perjanjian"
                        accept="image/png,image/jpeg"
                        clearable
                        placeholder="Upload files"
                        onChange={(file) => setFieldValue("file", file)}
                        required
                        // error={isSubmitAttempted && errors.file}
                      />

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

export default memo(AddInvestmentModal);
