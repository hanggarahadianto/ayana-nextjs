import React from "react";
import { Button, Group, InputWrapper, Modal, SimpleGrid, Stack, Textarea, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconEdit } from "@tabler/icons-react";

import BreathingActionIcon from "@/components/button/buttonAction";
import { getInitialValuesUpdatePayout, validationSchemaPayout } from "./initialValuesPayout";
import { useUpdatePayoutForm } from "@/api/payout/editDataPayout";

const EditPayoutModal = ({ payout, refetchPayoutData }: { payout: IPayoutUpdate; refetchPayoutData: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: editData, isPending: isLoading } = useUpdatePayoutForm(refetchPayoutData, close);

  const handleSubmit = (values: IPayoutUpdate) => {
    console.log("Submitting values:", values); // Debug log
    editData(values);
  };

  return (
    <>
      <BreathingActionIcon
        onClick={open}
        size="2rem"
        icon={<IconEdit size="1.5rem" />}
        gradient="linear-gradient(135deg, #93C5FD, #BFDBFE)"
      />

      <Modal opened={opened} onClose={close} size="lg" yOffset="100px">
        <Formik
          initialValues={getInitialValuesUpdatePayout(payout)}
          validateOnBlur={false}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, handleBlur }) => {
            console.log("VALUES", values);
            console.log(errors);
            return (
              <Form>
                <SimpleGrid p={20}>
                  <Stack gap={20}>
                    <InputWrapper label="No Invoice" withAsterisk error={touched.invoice && errors.invoice}>
                      <TextInput
                        placeholder="Masukan Invoice"
                        value={values.invoice?.toUpperCase() || ""}
                        onChange={(event) => setFieldValue("invoice", event.currentTarget.value.toUpperCase())}
                      />
                    </InputWrapper>

                    <Group gap={40}>
                      <InputWrapper label="Tanggal" required error={touched.date_inputed && errors.date_inputed}>
                        <DatePickerInput
                          w={200}
                          firstDayOfWeek={0}
                          value={values.date_inputed ? new Date(values.date_inputed) : null}
                          onChange={(date) => setFieldValue("date_inputed", date ? date.toISOString() : "")}
                          clearable
                          locale="id"
                          radius="sm"
                          valueFormat="DD MMMM YYYY"
                          rightSection={<IconCalendar size={18} />}
                          placeholder="Pilih tanggal"
                          onBlur={handleBlur}
                        />
                      </InputWrapper>

                      <InputWrapper label="Nominal" withAsterisk error={touched.nominal && errors.nominal}>
                        <TextInput
                          placeholder="Masukan Biaya Proyek"
                          value={values.nominal ? `Rp. ${values.nominal.toLocaleString("id-ID")}` : ""}
                          onChange={(event) => {
                            const rawValue = event.target.value.replace(/\D/g, "");
                            setFieldValue("nominal", Number(rawValue) || 0);
                          }}
                        />
                      </InputWrapper>
                    </Group>

                    <Textarea
                      value={values.note?.toUpperCase() || ""}
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
                    <Button type="submit" loading={isLoading}>
                      Edit Payout
                    </Button>
                  </Group>
                </SimpleGrid>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default EditPayoutModal;
