import React, { useEffect, useMemo, useState } from "react";
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
import { initialValuesCashFlowCreate, validationSchemaCashFlowCreate } from "../../../../../lib/initialValues/initialValuesCashFlow";
import { useSubmitCashFlowForm } from "@/api/cash-flow/postDataCashFlow";
import BreathingActionIcon from "@/components/button/buttonAction";
import ButtonAdd from "@/components/button/buttonAdd";
import ButtonDelete from "@/components/button/butttonDelete";
import { satuan } from "@/lib/satuan";
import { IconPlus } from "@tabler/icons-react";
import { useSubmitGoodForm } from "@/api/good/postDataGood";
import { showNotification } from "@mantine/notifications";
import { allWeeks } from "@/lib/weeks";

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

  const { mutate: postDataCashFlow, isPending: isLoadingPostDataCashFlow } = useSubmitCashFlowForm();
  const { mutate: postDataGoods, isPending: isLoadingPostDataGoods } = useSubmitGoodForm();

  const handleSubmit = async (values: ICashFlowCreate) => {
    try {
      postDataCashFlow(values, {
        onSuccess: (data) => {
          const cashFlowId = data.data?.id;
          if (!cashFlowId) {
            throw new Error("Cash Flow ID tidak valid.");
          }

          const goodsWithCashFlowId = (values.good || []).map((good) => ({
            ...good,
            cash_flow_id: cashFlowId,
          }));

          postDataGoods(goodsWithCashFlowId, {
            onError: () => {
              console.error("Gagal menyimpan data barang. Melakukan rollback...");
            },
          });

          refetchCashFlowData(); // Refresh data setelah sukses
        },
        onError: (error) => {
          console.error("Gagal menyimpan Cash Flow:", error);
        },
      });

      close();

      showNotification({
        title: "Data Berhasil Dikirim",
        message: "Data telah berhasil disimpan.",
        color: "green",
      });
    } catch (error) {
      console.error("Error saat mengirim data:", error);
    }
  };

  const selectedWeeks = useMemo(() => cashFlowData.map((item) => item.week_number), [cashFlowData]);

  // All possible weeks

  // Filter available weeks (hide weeks that are already selected)
  const availableWeeks = useMemo(() => {
    return allWeeks.filter((week: string) => !selectedWeeks.includes(week)).map((week) => ({ value: week, label: week }));
  }, [selectedWeeks]);

  return (
    <>
      <BreathingActionIcon
        onClick={open}
        size="3rem"
        icon={<IconPlus size="1.5rem" />}
        gradient="linear-gradient(135deg, #A3E635, #86EFAC)"
      />

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
            // console.log(values);
            // console.log("ERROR", errors);

            const [debouncedGoods, setDebouncedGoods] = useState(values.good || []);
            // console.log("DEBOUNCH GOODS", debouncedGoods);

            useEffect(() => {
              const handler = setTimeout(() => {
                const totalCost = debouncedGoods.reduce((acc, good) => acc + (good.total_cost || 0), 0);
                setFieldValue("cash_out", totalCost);
              }, 500); // Delay 300ms sebelum menghitung ulang cash_out

              return () => clearTimeout(handler);
            }, [debouncedGoods]);

            const addGoodField = () => {
              const newGood: IGoodsCreate = {
                good_name: "",
                status: "tunai",
                quantity: 0,
                unit: "",
                price: 0,
                cash_flow_id: "",
                costs_due: 0,
                total_cost: 0,
              };
              setDebouncedGoods((prevGoods) => {
                const updatedGoods = [...prevGoods, newGood];
                setFieldValue("good", updatedGoods); // Update Formik values
                return updatedGoods;
              });
            };
            const deleteGoodField = (goods: IGoodsCreate[], index: number) => {
              const updatedGoods = goods.filter((_, i) => i !== index);
              setDebouncedGoods(updatedGoods); // Perbarui state sementara
              setFieldValue("good", updatedGoods);
            };

            const calculateTotalCost = (price: number, quantity: number, costsDue: number): number => {
              const baseCost = price * quantity;
              const additionalCost = (costsDue / 100) * baseCost; // costsDue as percentage
              return baseCost + additionalCost;
            };

            const handleGoodChange = <T extends keyof IGoodsCreate>(index: number, field: T, value: IGoodsCreate[T]) => {
              const updatedGood = [...(values?.good || [])];
              updatedGood[index][field] = value;

              if (field === "price" || field === "quantity" || field === "costs_due") {
                const { price = 0, quantity = 0, costs_due = 0 } = updatedGood[index];
                updatedGood[index].total_cost = calculateTotalCost(price, quantity, costs_due);
              }

              setDebouncedGoods(updatedGood); // Tidak langsung update cash_out
              // setFieldValue("good", updatedGood);
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

                    <InputWrapper
                      required
                      error={touched.week_number && errors.week_number ? errors.week_number : undefined}
                    ></InputWrapper>
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
                    <ButtonAdd onClick={() => addGoodField()} size="3.5rem" />
                  </Group>

                  <Stack mt="md">
                    {Array.isArray(values.good) &&
                      values.good.map((good, index) => (
                        <Card key={index} shadow="lg" padding="lg" radius="md">
                          <Group>
                            <TextInput
                              label={`Nama Pengeluaran ${index + 1}`}
                              value={good.good_name || ""}
                              placeholder="Masukan Pengeluaran"
                              onChange={(event) => handleGoodChange(index, "good_name", event.currentTarget.value.toUpperCase())}
                            />

                            <NumberInput
                              w={100}
                              hideControls
                              label={"Kuantitas"}
                              placeholder="Masukan Kuantitas"
                              value={good.quantity || ""}
                              onChange={(value) => handleGoodChange(index, "quantity", Number(value) || 0)}
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
                                const rawValue = event.target.value.replace(/\D/g, ""); // Hanya angka
                                const numericValue = Number(rawValue) || 0;
                                handleGoodChange(index, "price", numericValue);
                              }}
                            />

                            <TextInput
                              w={140}
                              label={"Total"}
                              value={good.total_cost?.toLocaleString("id-ID") || "0"}
                              readOnly
                              styles={{ input: { fontWeight: "bold", cursor: "not-allowed" } }}
                            />

                            <Stack mt={20}>
                              <ButtonDelete onClick={() => deleteGoodField(debouncedGoods || [], index)} />
                            </Stack>
                          </Group>
                        </Card>
                      ))}
                  </Stack>

                  <Stack justify="flex-start" align="start">
                    <Text
                      size="md"
                      fw={500}
                      c="blue"
                      ta="center"
                      mt="md"
                      variant="gradient"
                      gradient={{ from: "blue", to: "cyan", deg: 90 }}
                    >
                      Total Pengeluaran{" "}
                      {values?.cash_out
                        ? `Rp. ${values.cash_out.toLocaleString("id-ID", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}`
                        : "Rp. 0,00"}
                    </Text>
                  </Stack>

                  <Group justify="flex-end" mt="md">
                    <Button onClick={close} variant="default">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="blue"
                      disabled={isLoadingPostDataCashFlow || isLoadingPostDataGoods}
                      loading={isLoadingPostDataCashFlow || isLoadingPostDataGoods}
                    >
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
