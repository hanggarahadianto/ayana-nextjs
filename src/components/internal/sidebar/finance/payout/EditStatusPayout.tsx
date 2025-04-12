"use client";
import { memo, useCallback } from "react";
import BreathingActionIcon from "@/lib/button/buttonAction";
import { getInitialValuesUpdatePaydDebt } from "@/lib/initialValues/initialValuesPayout";
import { validationSchemaPayDebt } from "@/lib/validation/payout-validation";
import { Button, Group, Modal, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconCreditCard } from "@tabler/icons-react";
import { Form, Formik } from "formik";
import { useUpdatePayoutForm } from "@/api/payout/editDataPayout";
import { formatCurrency } from "@/lib/formatCurrency";

interface PayPayoutButtonProps {
  payout: IPayoutUpdate | undefined;
  refetchPayoutData: () => void;
}

function PayPayoutButton({ payout, refetchPayoutData }: PayPayoutButtonProps) {
  const isDisabled = payout?.status !== "tempo";

  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: editData, isPending: isLoading } = useUpdatePayoutForm(refetchPayoutData, close);

  const handleSubmit = (values: IPayDebtUpdate) => {
    console.log("Submitting values:", values);
    editData(values);
    refetchPayoutData();
  };

  return (
    <>
      <BreathingActionIcon disabled={isDisabled} onClick={open} size={"2rem"} icon={<IconCreditCard size={14} />} />

      <Modal opened={opened} onClose={close} size="lg" yOffset="100px">
        <Formik
          initialValues={getInitialValuesUpdatePaydDebt(payout)}
          validationSchema={validationSchemaPayDebt}
          validateOnBlur={true}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, handleBlur }) => {
            console.log("VALUES", values);
            const handleChangePayDebt = useCallback(
              (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const { name, value } = e.currentTarget;
                const newValue = name === "invoice" ? value.toLocaleUpperCase() : value;

                setFieldValue(name, newValue);
              },
              [setFieldValue]
            );

            return (
              <Form>
                <SimpleGrid p={20}>
                  <Stack gap={20}>
                    <TextInput
                      label="Invoice"
                      name="invoice"
                      required
                      value={values.invoice}
                      placeholder="Masukkan Invoice"
                      error={touched.invoice && errors.invoice}
                      onChange={handleChangePayDebt}
                      onBlur={handleBlur}
                    />
                    <TextInput label="Nominal" name="nominal" required value={formatCurrency(payout?.nominal ?? 0)} readOnly />

                    <Group gap={40}>
                      <DatePickerInput
                        label="Tanggal Pembayaran"
                        error={touched.payment_date && errors.payment_date}
                        w={200}
                        firstDayOfWeek={0}
                        value={values.payment_date ? new Date(values.payment_date) : null}
                        onChange={(date) => setFieldValue("payment_date", date ? date.toISOString() : "")}
                        clearable
                        locale="id"
                        radius="sm"
                        valueFormat="DD MMMM YYYY"
                        rightSection={<IconCalendar size={18} />}
                        placeholder="Pilih tanggal"
                        onBlur={handleBlur}
                      />
                    </Group>
                  </Stack>

                  <Group justify="flex-end" mt="md">
                    <Button onClick={close} variant="default">
                      Cancel
                    </Button>
                    <Button type="submit" loading={false}>
                      Bayar
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
}

export default memo(PayPayoutButton);
