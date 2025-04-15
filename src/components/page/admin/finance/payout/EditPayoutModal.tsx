import React, { memo, useCallback } from "react";
import { Button, Group, Modal, Select, SimpleGrid, Stack, Textarea, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconEdit } from "@tabler/icons-react";

import BreathingActionIcon from "@/components/common/button/buttonAction";

import { useUpdatePayoutForm } from "@/api/payout/editDataPayout";
import { getInitialValuesUpdatePayout } from "@/utils/initialValues/initialValuesPayout";
import { validationSchemaPayout } from "@/utils/validation/payout-validation";
import { payoutCategory } from "@/constants/dictionary";

const EditPayoutModal = ({ payout, refetchPayoutData }: { payout: IPayoutUpdate; refetchPayoutData: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: editData, isPending: isLoading } = useUpdatePayoutForm(refetchPayoutData, close);

  const handleSubmit = useCallback(
    (values: IPayoutUpdate) => {
      const payload: Partial<IPayoutUpdate> = {
        ...values,
        nominal: Number(values.nominal),
        payment_date: values.payment_date || null,
      };

      if (!payload.payment_date) delete payload.payment_date;

      editData(payload as IPayoutUpdate); // Cast jika fungsi hanya menerima IPayoutUpdate
    },
    [editData]
  );

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
          validationSchema={validationSchemaPayout}
          validateOnBlur={false}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, setFieldValue, handleBlur }) => {
            console.log("VALUES", values);
            console.log("errors", errors);

            const handleChangePayout = useCallback(
              (setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void, field: string, value: any) => {
                setFieldValue(field, value);
              },
              []
            );
            return (
              <Form>
                <SimpleGrid p={20}>
                  <Stack gap={20}>
                    <TextInput
                      required
                      name="invoice"
                      label="Invoice"
                      withAsterisk
                      error={errors.invoice}
                      placeholder="Masukan Invoice"
                      value={values.invoice?.toUpperCase() || ""}
                      onChange={(event) => handleChangePayout(setFieldValue, "invoice", event.currentTarget.value.toUpperCase())}
                      onBlur={handleBlur}
                    />

                    <Select
                      clearable
                      label="Nama Lokasi"
                      placeholder="Pilih Lokasi"
                      onChange={(event) => handleChangePayout(setFieldValue, "category", event)}
                      data={payoutCategory}
                    />

                    <Group gap={40}>
                      <DatePickerInput
                        clearable
                        value={values.date_inputed ? new Date(values.date_inputed) : null}
                        label="Tanggal Pembelian"
                        w={200}
                        type="default"
                        firstDayOfWeek={0}
                        placeholder="Tanggal"
                        locale="id"
                        radius="sm"
                        valueFormat="DD MMMM YYYY"
                        rightSection={<IconCalendar size={18} />}
                        onChange={(value: Date | null) => {
                          if (value) {
                            const formattedDate = value.toISOString();
                            handleChangePayout(setFieldValue, "date_inputed", formattedDate);
                          }
                        }}
                        onBlur={handleBlur}
                        error={errors.date_inputed}
                      />

                      <DatePickerInput
                        value={values.due_date ? new Date(values.due_date) : null}
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
                            const formattedDate = value.toISOString();
                            handleChangePayout(setFieldValue, "due_date", formattedDate);
                          }
                        }}
                        onBlur={handleBlur}
                        error={errors.due_date}
                      />
                    </Group>

                    <TextInput
                      label="Nominal"
                      withAsterisk
                      required
                      placeholder="Masukan Biaya Proyek"
                      error={errors.nominal}
                      value={`Rp. ${values.nominal.toLocaleString("id-ID")}`}
                      onChange={(event) => {
                        const rawValue = event.target.value.replace(/\D/g, "");
                        const numericValue = Number(rawValue) || 0;
                        setFieldValue("nominal", numericValue);
                      }}
                    />

                    <Textarea
                      error={errors.note}
                      value={values.note.toUpperCase()}
                      label="Keterangan"
                      placeholder="Masukan Keterangan"
                      onChange={(event) => handleChangePayout(setFieldValue, "note", event.currentTarget.value.toUpperCase())}
                      mt="md"
                    />

                    <Group justify="flex-end" mt="md">
                      <Button onClick={close} variant="default">
                        Cancel
                      </Button>
                      <Button type="submit" loading={isLoading}>
                        Edit Payout
                      </Button>
                    </Group>
                  </Stack>
                </SimpleGrid>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default memo(EditPayoutModal);
