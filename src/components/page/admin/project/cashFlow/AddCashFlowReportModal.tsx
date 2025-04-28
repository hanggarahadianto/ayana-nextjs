import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Modal, TextInput, Button, Group, Select, Text, Stack, SimpleGrid, Grid, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { useSubmitCashFlowForm } from "@/api/cash-flow/postDataCashFlow";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import { IconPlus } from "@tabler/icons-react";
import { useSubmitGoodForm } from "@/api/good/postDataGood";
import { showNotification } from "@mantine/notifications";
import { allWeeks } from "@/constants/dictionary";
import { initialValuesCashFlowCreate } from "@/utils/initialValues/initialValuesCashFlow";
import FormGoods from "./FormGoods";
import { validationSchemaCashFlowCreate } from "@/utils/validation/cashFlow-validation";

const AddCashFlowReportModal = ({
  projectName,
  projectId,
  refetchCashFlowData,
  cashFlowData = [],
}: {
  projectName: string;
  projectId: string;
  refetchCashFlowData: () => void;
  cashFlowData?: ICashFlowResponse[];
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [accountBalance, setAccountBalance] = useState(0);

  const { mutate: postDataCashFlow, isPending: isLoadingPostDataCashFlow } = useSubmitCashFlowForm();
  const { mutate: postDataGoods, isPending: isLoadingPostDataGoods } = useSubmitGoodForm();

  const selectedWeeks = useMemo(() => {
    return cashFlowData.flatMap((res) => res.data.map((item) => item.week_number));
  }, [cashFlowData]);

  const availableWeeks = useMemo(() => {
    return allWeeks.filter((week: string) => !selectedWeeks.includes(week)).map((week) => ({ value: week, label: week }));
  }, [selectedWeeks, allWeeks]);

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

  return (
    <>
      <BreathingActionIcon
        onClick={open}
        size="2.5rem"
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
          {({ values, errors, touched, setFieldValue }) => {
            console.log("values", values);
            console.log("error", errors);
            const calculateCashOut = useCallback(() => {
              const totalCost = (values.good || []).reduce((acc, good) => acc + (good.total_cost || 0), 0);
              return totalCost; // Return the calculated cash_out
            }, [values.good]);

            // Calculate accountBalance as cash_in - cash_out
            const accountBalance = useMemo(() => {
              const cashOut = calculateCashOut();
              return values.cash_in - cashOut; // cash_in - cash_out
            }, [values.cash_in, calculateCashOut]);

            useEffect(() => {
              // Update cash_out field in Formik whenever goods change
              setFieldValue("cash_out", calculateCashOut());
            }, [values.good, setFieldValue, calculateCashOut]);

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
                            <Text>Rp {values.cash_in?.toLocaleString()}</Text>
                            <Text>Rp {values.cash_out.toLocaleString()}</Text>
                            <Text c={accountBalance < 0 ? "red" : "green"}> : Rp {accountBalance.toLocaleString()}</Text>
                          </Grid.Col>
                        </Grid>
                      </Stack>
                    </Grid.Col>
                  </Grid>

                  <Group>
                    <Select
                      error={touched.week_number && errors.week_number ? errors.week_number : undefined}
                      label="Minggu Ke"
                      placeholder="Pilih Minggu"
                      onChange={(value: any) => {
                        setFieldValue("week_number", value);
                      }}
                      data={availableWeeks} // Hide selected & past weeks
                      required
                    />

                    <TextInput
                      error={touched.cash_in && errors.cash_in ? errors.cash_in : undefined}
                      value={values?.cash_in ? `Rp. ${values?.cash_in.toLocaleString("id-ID")}` : ""}
                      w={400}
                      label={"Uang Masuk"}
                      placeholder="Masukan Uang Masuk"
                      onChange={(event) => {
                        const numericValue = Number(event.target.value.replace(/\D/g, "")); // Hanya angka
                        setFieldValue("cash_in", isNaN(numericValue) ? 0 : numericValue);
                      }}
                    />
                  </Group>

                  <Divider mt={20} />

                  <FormGoods
                    goods={values.good || []} // Directly bind to Formik's values.good
                    onGoodsChange={(updatedGoods) => setFieldValue("good", updatedGoods)} // Update goods field in Formik
                    isCreateMode={true} // Menandakan bahwa ini adalah mode create
                    error={(errors.good as any) || []} // Kirimkan array error ke FormGoods
                    touched={(touched.good as any) || []}
                    page={0}
                    limit={0}
                  />
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
