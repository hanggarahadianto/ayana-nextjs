import React, { useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Select,
  Card,
  Text,
  Stack,
  NumberInput,
  InputWrapper,
  SimpleGrid,
  ActionIcon,
  Flex,
  Grid,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";

import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useSubmitCashFlowForm } from "@/src/api/cash-flow/postDataCashFlow";
import ButtonAdd from "@/src/components/button/buttonAdd";
import ButtonDelete from "@/src/components/button/butttonDelete";
import { FiPlus } from "react-icons/fi";
import { initialValuesCashFlowCreate } from "./initialValuesCashFlow";

const AddCashFlowReportModal = ({
  projectName,
  projectId,
  refetchCashFlowData,
}: {
  projectName: any;
  projectId: any;
  refetchCashFlowData: () => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const today = dayjs().toISOString(); // Get today's date in ISO format

  const { mutate: postData, isPending: isLoadingSubmitProjectData } = useSubmitCashFlowForm(refetchCashFlowData, close);

  const handleSubmit = (values: ICashFlowCreate) => {
    const formData = { ...values, project_id: projectId };

    console.log("Form values submitted:", formData);

    postData(formData);
  };

  return (
    <>
      <ActionIcon variant="white" size="lg" onClick={open}>
        <IconPlus size="1.5rem" />
      </ActionIcon>

      <Modal
        opened={opened}
        onClose={close}
        size={"100%"}
        yOffset="100px" // Moves modal down
      >
        <Formik
          initialValues={initialValuesCashFlowCreate}
          validateOnBlur={false}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, setFieldValue, handleBlur }) => {
            console.log(values);

            const addGoodField = (good: IGoodCreate[]) => {
              const newGood: IGoodCreate = {
                good_name: "",
                status: "",
                quantity: 0,
                good_purchase_date: "",
                good_settlement_date: "",
                total_cost: 0,
              };
              setFieldValue("good", [...good, newGood]);
            };

            const deleteGoodField = (worker: IGoodCreate[], index: number) => {
              // Remove the good from the list
              const updatedGoods = worker.filter((_, i) => i !== index);

              // Recalculate the total cost after deletion
              const totalCost = updatedGoods.reduce((acc, good) => acc + (good.total_cost || 0), 0);

              // Update the state for both the goods and cash_out
              setFieldValue("good", updatedGoods);
              setFieldValue("cash_out", totalCost);
            };

            const handleGoodChange = <T extends keyof IGoodCreate>(index: number, field: T, value: IGoods[T]) => {
              const updatedGood = [...(values?.good || [])];
              updatedGood[index][field] = value;

              // Recalculate the total cost for all materials
              const totalCost = updatedGood.reduce((acc, good) => acc + (good.total_cost || 0), 0);

              // Update the state
              setFieldValue("good", updatedGood);
              setFieldValue("cash_out", totalCost);
            };

            const calculateAccountBalance = (cashIn: number, cashOut: number): number => {
              return cashIn - cashOut;
            };
            const cashIn = values.cash_in || 0;
            const cashOut = values.cash_out || 0;
            const accountBalance = calculateAccountBalance(cashIn, cashOut);

            const balanceColor = accountBalance < 0 ? "red" : "green"; // Set color to red if balance is negative

            return (
              <SimpleGrid p={20}>
                <Form>
                  <Grid>
                    <Grid.Col span={8}>
                      <Text size="xl" fw={900}>
                        {`BUKU KAS UMUM - ${projectName}`}
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Stack justify="end" align="end" w="100%">
                        <Grid w={400}>
                          <Grid.Col span={6}>
                            <Text size="md">💰 Uang Masuk</Text>
                            <Text size="md">💸 Uang Keluar</Text>
                            <Text size="md" fw={700} c={accountBalance < 0 ? "red" : "green"}>
                              🔹 Uang Tersisa
                            </Text>
                          </Grid.Col>
                          <Grid.Col span={6}>
                            <Text> : Rp {cashIn.toLocaleString()}</Text>
                            <Text> : Rp {cashOut.toLocaleString()}</Text>
                            <Text c={accountBalance < 0 ? "red" : "green"}> : Rp {accountBalance.toLocaleString()}</Text>
                          </Grid.Col>
                        </Grid>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                  <Flex p={20} justify={"space-between"}></Flex>
                  <Group>
                    <Select
                      label="Minggu Ke"
                      placeholder="Pilih Minggu"
                      onChange={(value: any) => {
                        setFieldValue("week_number", value);
                      }}
                      data={[
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3", label: "3" },
                        { value: "4", label: "4" },
                        { value: "5", label: "5" },
                        { value: "6", label: "6" },
                        { value: "7", label: "7" },
                        { value: "8", label: "8" },
                      ]}
                      required
                    />
                    <NumberInput
                      w={400}
                      hideControls
                      label={"Uang Masuk"}
                      placeholder="Masukan Uang Masuk"
                      value={"cash_in"}
                      onChange={(value: any) => {
                        setFieldValue("cash_in", value);
                      }}
                    />
                  </Group>

                  <Divider mt={20} />

                  <Group justify="space-between" p={20}>
                    <Text fw={700}>Tambahkan Daftar Pengeluaran</Text>
                    <ButtonAdd onClick={() => addGoodField(values.good || [])} size="3.5rem" />
                  </Group>

                  <Stack mt="md">
                    {values.good?.map((good: IGoodCreate, index: any) => (
                      <Card key={index} shadow="lg" padding="lg" radius="md">
                        <Group>
                          <TextInput
                            label={`Nama Pengeluaran ${index + 1}`}
                            placeholder="Masukan Pengeluaran"
                            value={good.good_name || ""}
                            onChange={(event) => handleGoodChange(index, "good_name", event.currentTarget.value)}
                            autoFocus={index === 0} // Focus the first input field by default
                          />
                          <Select
                            label="Status"
                            placeholder="Pilih Status"
                            value={good.status} // Default to "tunai"
                            onChange={(value: string | null) => {
                              if (value) {
                                handleGoodChange(index, "status", value); // Update status first

                                // Ensure the state updates first, then apply the date changes
                                if (value === "tunai") {
                                  setTimeout(() => {
                                    handleGoodChange(index, "good_purchase_date", today);
                                    handleGoodChange(index, "good_settlement_date", today);
                                  }, 0);
                                }
                              }
                            }}
                            data={[
                              { value: "tunai", label: "Tunai" },
                              { value: "tempo", label: "Tempo" },
                            ]}
                            required
                          />
                          {good.status === "tempo" && (
                            <>
                              <InputWrapper label="Tanggal Mulai">
                                <DatePickerInput
                                  w={200}
                                  type="default"
                                  firstDayOfWeek={0}
                                  placeholder="Tanggal Pembelian"
                                  clearable
                                  locale="id"
                                  radius="sm"
                                  valueFormat="DD MMMM YYYY"
                                  rightSection={<IconCalendar size={18} />}
                                  value={good.good_purchase_date ? new Date(good.good_purchase_date) : null}
                                  onChange={(value: Date | null) => {
                                    handleGoodChange(index, "good_purchase_date", value ? value.toISOString() : "");
                                  }}
                                  onBlur={handleBlur}
                                />
                              </InputWrapper>

                              <InputWrapper label="Tanggal Jatuh Tempo">
                                <DatePickerInput
                                  w={200}
                                  type="default"
                                  firstDayOfWeek={0}
                                  placeholder="Tanggal Jatuh Tempo"
                                  clearable
                                  locale="id"
                                  radius="sm"
                                  valueFormat="DD MMMM YYYY"
                                  rightSection={<IconCalendar size={18} />}
                                  value={good.good_settlement_date ? new Date(good.good_settlement_date) : null}
                                  onChange={(value: Date | null) => {
                                    handleGoodChange(index, "good_settlement_date", value ? value.toISOString() : "");
                                  }}
                                  onBlur={handleBlur}
                                />
                              </InputWrapper>
                            </>
                          )}
                          <NumberInput
                            hideControls
                            label={"Kuantitas"}
                            placeholder="Masukan Kuantitas"
                            value={good.quantity || ""}
                            onChange={(value) => handleGoodChange(index, "quantity", (value as number) || 0)}
                          />

                          <NumberInput
                            hideControls
                            label={"Total"}
                            placeholder="Masukan Total"
                            value={good.total_cost || ""}
                            onChange={(value) => handleGoodChange(index, "total_cost", (value as number) || 0)}
                          />

                          <ButtonDelete onClick={() => deleteGoodField(values?.good || [], index)} />
                        </Group>
                      </Card>
                    ))}
                    <Group p={20}>
                      <Text fw={800}>Total Biaya Pengeluaran</Text>
                      <Text fw={800} ml={20}>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(values.cash_out || 0)}
                      </Text>
                    </Group>
                  </Stack>

                  <Group justify="flex-end" mt="md">
                    <Button onClick={close} variant="default">
                      Cancel
                    </Button>
                    <Button type="submit" color="blue">
                      Tambah
                    </Button>
                  </Group>
                </Form>
              </SimpleGrid>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default AddCashFlowReportModal;
