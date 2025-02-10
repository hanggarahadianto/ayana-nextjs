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
  Flex,
  Grid,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";

import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconEdit, IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useSubmitCashFlowForm } from "@/src/api/cash-flow/postDataCashFlow";
import ButtonAdd from "@/src/components/button/buttonAdd";
import ButtonDelete from "@/src/components/button/butttonDelete";
import { initialValuesCashFlowCreate, validationSchemaCashFlowCreate } from "./initialValuesCashFlow";
import BreathingActionIcon from "@/src/components/button/buttonAction";
import { satuan } from "@/src/lib/satuan";

const AddCashFlowReportModal = ({
  projectName,
  projectId,
  refetchCashFlowData,
  cashFlowData = [],
}: {
  projectName: any;
  projectId: any;
  refetchCashFlowData: () => void;
  cashFlowData?: ICashFlow[];
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const today = dayjs().toISOString(); // Get today's date in ISO format

  const { mutate: postData, isPending: isLoadingSubmitProjectData } = useSubmitCashFlowForm(refetchCashFlowData, close);

  const handleSubmit = (values: ICashFlowCreate) => {
    // const formData = { ...values, project_id: projectId };

    console.log("Form values submitted:", values);

    postData(values);
  };

  const selectedWeeks = cashFlowData.map((item) => item.week_number);

  // All possible weeks
  const allWeeks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];

  // Filter available weeks (hide weeks that are already selected)
  const availableWeeks = allWeeks
    .filter((week) => !selectedWeeks.includes(week)) // Remove used weeks
    .map((week) => ({ value: week, label: week })); // Convert to Select format

  return (
    <>
      <BreathingActionIcon onClick={open} size={"3rem"} icon={<IconPlus size="1rem" />} />

      <Modal
        opened={opened}
        onClose={close}
        size={"100%"}
        yOffset="100px" // Moves modal down
      >
        <Formik
          initialValues={initialValuesCashFlowCreate(projectId)}
          validationSchema={validationSchemaCashFlowCreate}
          validateOnBlur={false}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, handleBlur }) => {
            console.log(values);
            // console.log("ERROR", errors);

            const addGoodField = (good: IGoodCreate[]) => {
              const newGood: IGoodCreate = {
                good_name: "",
                status: "",
                quantity: 0,
                unit: "",
                price: 0,
                good_purchase_date: "",
                good_settlement_date: "",
                costs_due: 0,
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

            const calculateTotalCost = (price: number, quantity: number, costsDue: number): number => {
              const baseCost = price * quantity;
              const additionalCost = (costsDue / 100) * baseCost; // costsDue as percentage
              return baseCost + additionalCost;
            };

            const handleGoodChange = <T extends keyof IGoodCreate>(index: number, field: T, value: IGoodCreate[T]) => {
              const updatedGood = [...(values?.good || [])];
              updatedGood[index][field] = value;

              // If price, quantity, or costs_due is updated, recalculate total_cost
              if (field === "price" || field === "quantity" || field === "costs_due") {
                const { price = 0, quantity = 0, costs_due = 0 } = updatedGood[index];
                updatedGood[index].total_cost = calculateTotalCost(price, quantity, costs_due);
              }

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
                    <InputWrapper required error={touched.week_number && errors.week_number ? errors.week_number : undefined}>
                      <Select
                        label="Minggu Ke"
                        placeholder="Pilih Minggu"
                        onChange={(value: any) => {
                          setFieldValue("week_number", value);
                        }}
                        data={availableWeeks} // Hide selected & past weeks
                        required
                      />
                    </InputWrapper>

                    <InputWrapper required error={touched.week_number && errors.week_number ? errors.week_number : undefined}>
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
                    </InputWrapper>
                    <InputWrapper required error={touched.cash_in && errors.cash_in ? errors.cash_in : undefined}>
                      <TextInput
                        value={values?.cash_in ? `Rp. ${values?.cash_in.toLocaleString("id-ID")}` : ""}
                        w={400}
                        label={"Uang Masuk"}
                        placeholder="Masukan Uang Masuk"
                        onChange={(event) => {
                          const numericValue = Number(event.target.value.replace(/\D/g, "")); // Hanya angka
                          setFieldValue("cash_in", isNaN(numericValue) ? 0 : numericValue);
                        }}
                      />
                    </InputWrapper>
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
                            value={good.good_name.toLocaleUpperCase() || ""}
                            onChange={(event) => handleGoodChange(index, "good_name", event.currentTarget.value.toLocaleUpperCase())}
                            autoFocus={index === 0} // Focus the first input field by default
                          />
                          <Select
                            w={100}
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
                              <NumberInput
                                w={100}
                                hideControls
                                label={"Biaya Tempo"}
                                placeholder="Masukan Biaya Tempo"
                                value={good.costs_due || ""}
                                rightSection={
                                  <Text size="sm" c="gray">
                                    %
                                  </Text>
                                }
                                onChange={(value) => handleGoodChange(index, "costs_due", (value as number) || 0)}
                              />
                            </>
                          )}

                          <NumberInput
                            w={100}
                            hideControls
                            label={"Kuantitas"}
                            placeholder="Masukan Kuantitas"
                            value={good.quantity || ""}
                            onChange={(value) => handleGoodChange(index, "quantity", (value as number) || 0)}
                          />

                          <Select
                            w={100}
                            label={"Satuan"}
                            placeholder="Satuan"
                            value={good.unit || ""}
                            data={satuan}
                            onChange={(value) => handleGoodChange(index, "unit", value || "")}
                          />

                          <TextInput
                            w={140}
                            label="Harga"
                            placeholder="Masukan Harga"
                            value={good.price ? `Rp. ${good.price.toLocaleString("id-ID")}` : ""}
                            onChange={(event) => {
                              const rawValue = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                              const numericValue = Number(rawValue) || 0;
                              handleGoodChange(index, "price", numericValue); // Store as number
                            }}
                          />

                          <TextInput
                            w={140}
                            label={"Total"}
                            value={good.total_cost?.toLocaleString("id-ID") || "0"} // Format as currency if needed
                            readOnly
                            styles={{ input: { fontWeight: "bold", cursor: "not-allowed" } }} // Light background to indicate it's view-only
                          />

                          <Stack mt={20}>
                            <ButtonDelete onClick={() => deleteGoodField(values?.good || [], index)} />
                          </Stack>
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
